import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { InvitationV1 } from '../data/version1/InvitationV1';
export interface IInvitationsController {
    getInvitations(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>>;
    getInvitationById(correlationId: string, invitationId: string): Promise<InvitationV1>;
    createInvitation(correlationId: string, invitation: InvitationV1): Promise<InvitationV1>;
    deleteInvitationById(correlationId: string, invitationId: string): Promise<InvitationV1>;
    activateInvitations(correlationId: string, email: string, userId: string): Promise<InvitationV1[]>;
    approveInvitation(correlationId: string, invitationId: string, role: string): Promise<InvitationV1>;
    denyInvitation(correlationId: string, invitationId: string): Promise<InvitationV1>;
    resendInvitation(correlationId: string, invitationId: string): Promise<InvitationV1>;
    notifyInvitation(correlationId: string, invitation: InvitationV1): Promise<void>;
}
