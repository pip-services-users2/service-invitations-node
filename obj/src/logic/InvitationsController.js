"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const InvitationActionV1_1 = require("../data/version1/InvitationActionV1");
const InvitationsCommandSet_1 = require("./InvitationsCommandSet");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
const MessageConnector_1 = require("./MessageConnector");
class InvitationsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(InvitationsController._defaultConfig);
        this._messageResolver = new client_msgdistribution_node_1.MessageResolverV1();
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
        this._expireTimeout = 15 * 24 * 3600000;
    }
    configure(config) {
        config = config.setDefaults(InvitationsController._defaultConfig);
        this._dependencyResolver.configure(config);
        this._messageResolver.configure(config);
        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
        this._messageDistributionClient = this._dependencyResolver.getOneOptional('msgdistribution');
        this._messageConnector = new MessageConnector_1.MessageConnector(this._logger, this._messageResolver, this._messageDistributionClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new InvitationsCommandSet_1.InvitationsCommandSet(this);
        return this._commandSet;
    }
    getInvitations(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getInvitationById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    createInvitation(correlationId, invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            let newInvitation;
            let organizationAdminIds = [];
            let now = new Date();
            invitation.create_time = now;
            invitation.expire_time = new Date(now.getTime() + this._expireTimeout);
            invitation.sent_time = now;
            // Delete similar old requests
            let filter = pip_services3_commons_nodex_3.FilterParams.fromTuples('type', invitation.action, 'org_id', invitation.org_id, 'invitee_id', invitation.invitee_id, 'invitee_email', invitation.invitee_email);
            yield this._persistence.deleteByFilter(correlationId, filter);
            // Create invitation
            newInvitation = yield this._persistence.create(correlationId, invitation);
            // Get organization admins for response invitations
            if (invitation.action == InvitationActionV1_1.InvitationActionV1.Approve) {
                let role = invitation.org_id ? invitation.org_id + ':admin' : 'admin';
                let roles = yield this._rolesClient.getRolesByFilter(correlationId, pip_services3_commons_nodex_3.FilterParams.fromTuples('roles', [role]), new pip_services3_commons_nodex_4.PagingParams());
                organizationAdminIds = roles ? roles.data.map(r => r.id) : [];
            }
            // Send invitation message
            if (invitation.action == InvitationActionV1_1.InvitationActionV1.Activate) {
                let message = this._messageResolver.resolve('invitation');
                yield this._messageConnector.sendInvitation(correlationId, message, invitation);
            }
            else {
                let message = this._messageResolver.resolve('access_request');
                yield this._messageConnector.sendAccessRequest(correlationId, message, invitation, organizationAdminIds);
            }
            return newInvitation;
        });
    }
    deleteInvitationById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete invitation
            let invitation = yield this._persistence.deleteById(correlationId, id);
            // Send denial message
            if (invitation.action && invitation.action == InvitationActionV1_1.InvitationActionV1.Approve) {
                let message = this._messageResolver.resolve('access_denied');
                yield this._messageConnector.sendInvitation(correlationId, message, invitation);
            }
            return invitation;
        });
    }
    activateInvitations(correlationId, email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitations;
            // Retrieve all pending invitations
            let page = yield this._persistence.getPageByFilter(correlationId, pip_services3_commons_nodex_3.FilterParams.fromTuples('invitee_email', email), null);
            invitations = page != null ? page.data : null;
            let tasks = [];
            for (let invitation of invitations) {
                let orgId = invitation.org_id;
                let role = invitation.role || 'user';
                role = orgId ? orgId + ':' + role : role;
                tasks.push(this._rolesClient.grantRoles(correlationId, userId, [role]));
            }
            yield Promise.all(tasks);
            // Remove pending invitations
            yield this._persistence.deleteByFilter(correlationId, pip_services3_commons_nodex_3.FilterParams.fromTuples('invitee_email', email));
            return invitations || [];
        });
    }
    approveInvitation(correlationId, invitationId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldInvitation;
            // Find invitation
            oldInvitation = yield this._persistence.getOneById(correlationId, invitationId);
            if (oldInvitation == null) {
                throw new pip_services3_commons_nodex_5.NotFoundException(correlationId, 'INVITE_NOT_FOUND', 'Invitation ' + invitationId + ' was not found').withDetails('invitation_id', invitationId);
            }
            // Extend invitation and send email
            if (oldInvitation.action == InvitationActionV1_1.InvitationActionV1.Approve) {
                let orgId = oldInvitation.org_id;
                let userId = oldInvitation.invitee_id;
                // set role 
                role = role ? role : oldInvitation.role || 'user';
                role = orgId ? orgId + ':' + role : role;
                yield this._rolesClient.grantRoles(correlationId, userId, [role]);
            }
            // Delete processed invitation
            yield this._persistence.deleteById(correlationId, invitationId);
            // Send approval message
            if (oldInvitation.action == InvitationActionV1_1.InvitationActionV1.Approve) {
                let message = this._messageResolver.resolve('access_approved');
                yield this._messageConnector.sendInvitation(correlationId, message, oldInvitation);
            }
            return oldInvitation;
        });
    }
    denyInvitation(correlationId, invitationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteInvitationById(correlationId, invitationId);
        });
    }
    resendInvitation(correlationId, invitationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldInvitation;
            let organizationAdminIds;
            // Find invitation
            oldInvitation = yield this._persistence.getOneById(correlationId, invitationId);
            if (oldInvitation == null) {
                throw new pip_services3_commons_nodex_5.NotFoundException(correlationId, 'INVITE_NOT_FOUND', 'Invitation ' + invitationId + ' was not found').withDetails('invitation_id', invitationId);
            }
            // Save invitation
            let now = new Date();
            oldInvitation.sent_time = now;
            oldInvitation.expire_time = new Date(now.getTime() + this._expireTimeout);
            yield this._persistence.update(correlationId, oldInvitation);
            // Get organization admins for response invitations
            if (oldInvitation.action == InvitationActionV1_1.InvitationActionV1.Approve) {
                let role = oldInvitation.org_id ? oldInvitation.org_id + ':admin' : 'admin';
                let roles = yield this._rolesClient.getRolesByFilter(correlationId, pip_services3_commons_nodex_3.FilterParams.fromTuples('roles', [role]), new pip_services3_commons_nodex_4.PagingParams());
                organizationAdminIds = roles ? roles.data.map(r => r.id) : [];
            }
            // Send invitation email
            if (oldInvitation.action == InvitationActionV1_1.InvitationActionV1.Activate) {
                let message = this._messageResolver.resolve('invitation');
                yield this._messageConnector.sendInvitation(correlationId, message, oldInvitation);
            }
            else {
                let message = this._messageResolver.resolve('access_request');
                yield this._messageConnector.sendAccessRequest(correlationId, message, oldInvitation, organizationAdminIds);
            }
            return oldInvitation;
        });
    }
    notifyInvitation(correlationId, invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (invitation.action == InvitationActionV1_1.InvitationActionV1.Notify) {
                let message = this._messageResolver.resolve('organization_invitation');
                yield this._messageConnector.sendInvitation(correlationId, message, invitation);
            }
        });
    }
}
exports.InvitationsController = InvitationsController;
InvitationsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-invitations:persistence:*:*:1.0', 'dependencies.roles', 'service-roles:client:*:*:1.0', 'dependencies.msgdistribution', 'service-msgdistribution:client:*:*:1.0', 'message_templates.invitation.subject', 'Invitation to Positron', 'message_templates.invitation.text', 'You were invited to join organization {{ org_name }} at Positron by {{ creator_name }}', 'message_templates.access_request.subject', 'Request for organization access', 'message_templates.access_request.text', 'You were requested to grant access to organization {{ org_name }} by {{ creator_name }}', 'message_templates.access_approved.subject', 'Granted organization access', 'message_templates.access_approved.text', 'Your request to access organization {{ org_name }} was approved', 'message_templates.access_denied.subject', 'Denied organization access', 'message_templates.access_denied.text', 'Your request to access to organization {{ org_name }} was denied', 'message_templates.organization_invitation.subject', 'Organization invitation', 'message_templates.organization_invitation.text', 'You was invited to access organization {{ org_name }} by {{ creator_name }}', 'options.expire_timeout', 15 * 24 * 3600000);
//# sourceMappingURL=InvitationsController.js.map