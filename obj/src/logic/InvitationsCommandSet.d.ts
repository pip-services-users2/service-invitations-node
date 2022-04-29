import { CommandSet } from 'pip-services3-commons-nodex';
import { IInvitationsController } from './IInvitationsController';
export declare class InvitationsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IInvitationsController);
    private makeGetInvitationsCommand;
    private makeGetInvitationByIdCommand;
    private makeCreateInvitationCommand;
    private makeDeleteInvitationByIdCommand;
    private makeActivateInvitationsCommand;
    private makeApproveInvitationCommand;
    private makeDenyInvitationCommand;
    private makeResendInvitationCommand;
    private makeNotifyInvitationCommand;
}
