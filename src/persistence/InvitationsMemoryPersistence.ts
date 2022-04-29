import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { InvitationV1 } from '../data/version1/InvitationV1';
import { IInvitationsPersistence } from './IInvitationsPersistence';

export class InvitationsMemoryPersistence 
    extends IdentifiableMemoryPersistence<InvitationV1, string> 
    implements IInvitationsPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let action = filter.getAsNullableString('action');
        let org_id = filter.getAsNullableString('org_id');
        let invitee_email = filter.getAsNullableString('invitee_email');
        let invitee_id = filter.getAsNullableString('invitee_id');
        
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (org_id && item.org_id != org_id) 
                return false;
            if (type && item.action != type) 
                return false;
            if (action && item.action != action) 
                return false;
            if (invitee_email != null && item.invitee_email != invitee_email)
                return false;
            if (invitee_id != null && item.invitee_id != invitee_id)
                return false;

            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async deleteByFilter(correlationId: string, filter: FilterParams): Promise<void> {
        return await super.deleteByFilter(correlationId, this.composeFilter(filter));
    }
    
}
