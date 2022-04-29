import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { InvitationV1 } from '../../data/version1/InvitationV1';
export declare class InvitationsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromInvitation(invitation: InvitationV1): any;
    static toInvitation(obj: any): InvitationV1;
    static fromInvitationPage(page: DataPage<InvitationV1>): any;
    static toInvitationPage(obj: any): DataPage<InvitationV1>;
    static fromInvitationList(invitations: InvitationV1[]): any[];
    static toInvitationList(obj: any): InvitationV1[];
}
