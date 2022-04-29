import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { InvitationV1 } from '../data/version1/InvitationV1';
import { IInvitationsPersistence } from './IInvitationsPersistence';
export declare class InvitationsMemoryPersistence extends IdentifiableMemoryPersistence<InvitationV1, string> implements IInvitationsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>>;
    deleteByFilter(correlationId: string, filter: FilterParams): Promise<void>;
}
