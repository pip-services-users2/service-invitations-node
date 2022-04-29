import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';

import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { NotFoundException } from 'pip-services3-commons-nodex';
import { CompositeLogger } from 'pip-services3-components-nodex';

import { InvitationActionV1 } from '../data/version1/InvitationActionV1';
import { InvitationV1 } from '../data/version1/InvitationV1';
import { IInvitationsPersistence } from '../persistence/IInvitationsPersistence';
import { IInvitationsController } from './IInvitationsController';
import { InvitationsCommandSet } from './InvitationsCommandSet';

import { MessageResolverV1 } from 'client-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';
import { IRolesClientV1 } from 'client-roles-node';
import { MessageConnector } from './MessageConnector';

export class InvitationsController implements  IConfigurable, IReferenceable, ICommandable, IInvitationsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-invitations:persistence:*:*:1.0',
        'dependencies.roles', 'service-roles:client:*:*:1.0',
        'dependencies.msgdistribution', 'service-msgdistribution:client:*:*:1.0',
        
        'message_templates.invitation.subject', 'Invitation to Positron',
        'message_templates.invitation.text', 'You were invited to join organization {{ org_name }} at Positron by {{ creator_name }}',
        'message_templates.access_request.subject', 'Request for organization access',
        'message_templates.access_request.text', 'You were requested to grant access to organization {{ org_name }} by {{ creator_name }}',
        'message_templates.access_approved.subject', 'Granted organization access',
        'message_templates.access_approved.text', 'Your request to access organization {{ org_name }} was approved',
        'message_templates.access_denied.subject', 'Denied organization access',
        'message_templates.access_denied.text', 'Your request to access to organization {{ org_name }} was denied',
        'message_templates.organization_invitation.subject', 'Organization invitation',
        'message_templates.organization_invitation.text', 'You was invited to access organization {{ org_name }} by {{ creator_name }}',

        'options.expire_timeout', 15 * 24 * 3600000
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(InvitationsController._defaultConfig);
    private _messageResolver: MessageResolverV1 = new MessageResolverV1();
    private _logger: CompositeLogger = new CompositeLogger();
    private _persistence: IInvitationsPersistence;
    private _rolesClient: IRolesClientV1;
    private _messageDistributionClient: IMessageDistributionClientV1;
    private _messageConnector: MessageConnector;
    private _commandSet: InvitationsCommandSet;

    private _expireTimeout: number = 15 * 24 * 3600000;

    public configure(config: ConfigParams): void {
        config = config.setDefaults(InvitationsController._defaultConfig)
        this._dependencyResolver.configure(config);
        this._messageResolver.configure(config);

        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IInvitationsPersistence>('persistence');
        this._rolesClient = this._dependencyResolver.getOneRequired<IRolesClientV1>('roles');
        this._messageDistributionClient = this._dependencyResolver.getOneOptional<IMessageDistributionClientV1>('msgdistribution');

        this._messageConnector = new MessageConnector(
            this._logger,
            this._messageResolver,
            this._messageDistributionClient
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new InvitationsCommandSet(this);
        return this._commandSet;
    }
    
    public async getInvitations(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getInvitationById(correlationId: string, id: string): Promise<InvitationV1> {
        return await this._persistence.getOneById(correlationId, id);
    }

    public async createInvitation(correlationId: string, invitation: InvitationV1): Promise<InvitationV1> {
        
        let newInvitation: InvitationV1;
        let organizationAdminIds: string[] = [];

        let now = new Date();
        invitation.create_time = now;
        invitation.expire_time = new Date(now.getTime() + this._expireTimeout);
        invitation.sent_time = now;

        // Delete similar old requests
        let filter = FilterParams.fromTuples(
            'type', invitation.action,
            'org_id', invitation.org_id,
            'invitee_id', invitation.invitee_id,
            'invitee_email', invitation.invitee_email
        );

        await this._persistence.deleteByFilter(correlationId, filter);

        // Create invitation
        newInvitation = await this._persistence.create(correlationId, invitation);

        // Get organization admins for response invitations
        if (invitation.action == InvitationActionV1.Approve) {
            let role = invitation.org_id ? invitation.org_id + ':admin' : 'admin';

            let roles = await this._rolesClient.getRolesByFilter(
                correlationId,
                FilterParams.fromTuples('roles', [role]),
                new PagingParams()
            );

            organizationAdminIds = roles ? roles.data.map(r => r.id) : [];
        }

        // Send invitation message
        if (invitation.action == InvitationActionV1.Activate) {
            let message = this._messageResolver.resolve('invitation');
            await this._messageConnector.sendInvitation(correlationId, message, invitation);
        } else {
            let message = this._messageResolver.resolve('access_request');
            await this._messageConnector.sendAccessRequest(correlationId, message, invitation, organizationAdminIds);
        }

        return newInvitation;
    }

    public async deleteInvitationById(correlationId: string, id: string): Promise<InvitationV1> {  
        // Delete invitation
        let invitation: InvitationV1 = await this._persistence.deleteById(correlationId, id);

        // Send denial message
        if (invitation.action && invitation.action == InvitationActionV1.Approve) {
            let message = this._messageResolver.resolve('access_denied');
            await this._messageConnector.sendInvitation(correlationId, message, invitation);
        }

        return invitation;
    }

    public async activateInvitations(correlationId: string, email: string, userId: string): Promise<InvitationV1[]> {
        let invitations: InvitationV1[];

        // Retrieve all pending invitations
        let page = await this._persistence.getPageByFilter(
            correlationId,
            FilterParams.fromTuples(
                'invitee_email', email
            ),
            null
        );

        invitations = page != null ? page.data : null;
        
        let tasks = [];

        for (let invitation of invitations) {
            let orgId = invitation.org_id;
            let role = invitation.role || 'user';
            role = orgId ? orgId + ':' + role : role;

            tasks.push(this._rolesClient.grantRoles(correlationId, userId, [role]));
        }

        await Promise.all(tasks);
        
        // Remove pending invitations
        await this._persistence.deleteByFilter(
            correlationId,
            FilterParams.fromTuples(
                'invitee_email', email
            )
        );
        
        return invitations || [];
    }

    public async approveInvitation(correlationId: string, invitationId: string, role: string): Promise<InvitationV1> {
        let oldInvitation: InvitationV1;

        // Find invitation
        oldInvitation = await this._persistence.getOneById(
            correlationId, invitationId
        );

        if (oldInvitation == null) {
            throw new NotFoundException(
                correlationId,
                'INVITE_NOT_FOUND',
                'Invitation ' + invitationId + ' was not found'
            ).withDetails('invitation_id', invitationId);
        }

        // Extend invitation and send email
        if (oldInvitation.action == InvitationActionV1.Approve) {
            let orgId = oldInvitation.org_id;
            let userId = oldInvitation.invitee_id;
            // set role 
            role = role ? role : oldInvitation.role || 'user';
            role = orgId ? orgId + ':' + role : role;

            await this._rolesClient.grantRoles(correlationId, userId, [role]);
        }

        // Delete processed invitation
        await this._persistence.deleteById(correlationId, invitationId);

        // Send approval message
        if (oldInvitation.action == InvitationActionV1.Approve) {
            let message = this._messageResolver.resolve('access_approved');
            await this._messageConnector.sendInvitation(correlationId, message, oldInvitation);
        }

        return oldInvitation;
    }

    public async denyInvitation(correlationId: string, invitationId: string): Promise<InvitationV1> {
        return await this.deleteInvitationById(correlationId, invitationId);
    }

    public async resendInvitation(correlationId: string, invitationId: string): Promise<InvitationV1> {
        let oldInvitation: InvitationV1;
        let organizationAdminIds: string[];

        // Find invitation
        oldInvitation = await this._persistence.getOneById(
            correlationId, invitationId
        );

        if (oldInvitation == null) {
            throw new NotFoundException(
                correlationId,
                'INVITE_NOT_FOUND',
                'Invitation ' + invitationId + ' was not found'
            ).withDetails('invitation_id', invitationId);
        }

        // Save invitation
        let now = new Date();

        oldInvitation.sent_time = now;
        oldInvitation.expire_time = new Date(now.getTime() + this._expireTimeout);
        await this._persistence.update(correlationId, oldInvitation);

        // Get organization admins for response invitations
        if (oldInvitation.action == InvitationActionV1.Approve) {
            let role = oldInvitation.org_id ? oldInvitation.org_id + ':admin' : 'admin';

            let roles = await this._rolesClient.getRolesByFilter(
                correlationId,
                FilterParams.fromTuples('roles', [role]),
                new PagingParams()
            );

            organizationAdminIds = roles ? roles.data.map(r => r.id) : [];
        }

        // Send invitation email
        if (oldInvitation.action == InvitationActionV1.Activate) {
            let message = this._messageResolver.resolve('invitation');
            await this._messageConnector.sendInvitation(correlationId, message, oldInvitation);
        } else {
            let message = this._messageResolver.resolve('access_request');
            await this._messageConnector.sendAccessRequest(correlationId, message, oldInvitation, organizationAdminIds);
        }

        return oldInvitation;

    }

    public async notifyInvitation(correlationId: string, invitation: InvitationV1): Promise<void> {

        if (invitation.action == InvitationActionV1.Notify) {
            let message = this._messageResolver.resolve('organization_invitation');
            await this._messageConnector.sendInvitation(correlationId, message, invitation);
        }
    }
    
}
