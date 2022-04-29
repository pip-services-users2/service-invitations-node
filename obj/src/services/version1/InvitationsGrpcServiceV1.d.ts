import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class InvitationsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getInvitations;
    private getInvitationById;
    private createInvitation;
    private deleteInvitationById;
    private activateInvitations;
    private approveInvitation;
    private denyInvitation;
    private resendInvitation;
    private notifyInvitation;
    register(): void;
}
