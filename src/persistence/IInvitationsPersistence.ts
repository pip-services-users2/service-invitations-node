import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { InvitationV1 } from '../data/version1/InvitationV1';

export interface IInvitationsPersistence extends IGetter<InvitationV1, string>, IWriter<InvitationV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>>;

    getOneById(correlationId: string, id: string): Promise<InvitationV1>;

    create(correlationId: string, item: InvitationV1): Promise<InvitationV1>;

    deleteById(correlationId: string, id: string): Promise<InvitationV1>;

    deleteByFilter(correlationId: string, filter: FilterParams): Promise<void>;
}
