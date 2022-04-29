const services = require('../../../../src/protos/invitations_v1_grpc_pb');
const messages = require('../../../../src/protos/invitations_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IInvitationsController } from '../../logic/IInvitationsController';
import { InvitationsGrpcConverterV1 } from './InvitationsGrpcConverterV1';

export class InvitationsGrpcServiceV1 extends GrpcService {
    private _controller: IInvitationsController;
	
    public constructor() {
        super(services.InvitationsService);
        this._dependencyResolver.put('controller', new Descriptor("service-invitations", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IInvitationsController>('controller');
    }
    
    private async getInvitations(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        InvitationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = InvitationsGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.InvitationPageReply();
        try {
            let result = await this._controller.getInvitations(
                correlationId,
                filter,
                paging
            );
            let page = InvitationsGrpcConverterV1.fromInvitationPage(result);
            response.setPage(page);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
        
    }

    private async getInvitationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitationId = call.request.getInvitationId();
        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.getInvitationById(
                correlationId,
                invitationId
            );
            let invitation = InvitationsGrpcConverterV1.fromInvitation(result);
            response.setInvitation(invitation);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;

        
    }
    
    private async createInvitation(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitation = InvitationsGrpcConverterV1.toInvitation(call.request.getInvitation());
        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.createInvitation(
                correlationId,
                invitation
            );
            let invitationGrpcObj = InvitationsGrpcConverterV1.fromInvitation(result);
            if (result)
                response.setInvitation(invitationGrpcObj);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
        
    }

    private async deleteInvitationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitationId = call.request.getInvitationId();
        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.deleteInvitationById(correlationId, invitationId);
            let invitation = InvitationsGrpcConverterV1.fromInvitation(result);
            if (result)
                response.setInvitation(invitation);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    private async activateInvitations(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let email = call.request.getEmail();
        let userId = call.request.getUserId();
        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.activateInvitations(
                correlationId,
                email, userId
            );
            let invitations = InvitationsGrpcConverterV1.fromInvitationList(result);
            if (result)
                response.setInvitationList(invitations);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
        
    }

    private async approveInvitation(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitationId = call.request.getInvitationId();
        let role = call.request.getRole();
        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.approveInvitation(correlationId, invitationId, role);
            let invitation = InvitationsGrpcConverterV1.fromInvitation(result);
            if (result)
                response.setInvitation(invitation);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async denyInvitation(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitationId = call.request.getInvitationId();

        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.denyInvitation(
                correlationId,
                invitationId
            );
            let invitation = InvitationsGrpcConverterV1.fromInvitation(result);
            if (result)
                response.setInvitation(invitation);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async resendInvitation(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitationId = call.request.getInvitationId();

        let response = new messages.InvitationObjectReply();

        try {
            let result = await this._controller.resendInvitation(correlationId, invitationId);
            let invitation = InvitationsGrpcConverterV1.fromInvitation(result);
            if (result)
                response.setInvitation(invitation);
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async notifyInvitation(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let invitation = InvitationsGrpcConverterV1.toInvitation(call.request.getInvitation());
        let response = new messages.InvitationEmptyReply();

        try {
            await this._controller.notifyInvitation(
                correlationId,
                invitation
            );
        } catch(err) {
            let error = InvitationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    public register() {
        this.registerMethod(
            'get_invitations', 
            null,
            this.getInvitations
        );

        this.registerMethod(
            'get_invitation_by_id', 
            null,
            this.getInvitationById
        );

        this.registerMethod(
            'create_invitation', 
            null,
            this.createInvitation
        );

        this.registerMethod(
            'delete_invitation_by_id',
            null, 
            this.deleteInvitationById
        );


        this.registerMethod(
            'activate_invitations', 
            null,
            this.activateInvitations
        );


        this.registerMethod(
            'approve_invitation', 
            null,
            this.approveInvitation
        );

        this.registerMethod(
            'deny_invitation', 
            null,
            this.denyInvitation
        );

        this.registerMethod(
            'resend_invitation', 
            null,
            this.resendInvitation
        );

        this.registerMethod(
            'notify_invitation', 
            null,
            this.notifyInvitation
        );
        
    }
}
