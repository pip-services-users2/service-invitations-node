import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { InvitationV1 } from '../data/version1/InvitationV1';
import { IInvitationsPersistence } from './IInvitationsPersistence';

export class InvitationsMongoDbPersistence extends IdentifiableMongoDbPersistence<InvitationV1, string>
    implements IInvitationsPersistence {

    constructor() {
        super('invitations');
        this.ensureIndex({ invitee_email: 1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ action: type });

        let action = filter.getAsNullableString('action');
        if (action != null)
            criteria.push({ action: action });
    
        let org_id = filter.getAsNullableString('org_id');
        if (org_id != null)
            criteria.push({ org_id: org_id });

        let invitee_id = filter.getAsNullableString('invitee_id');
        if (invitee_id != null)
            criteria.push({ invitee_id: invitee_id });

        let invitee_email = filter.getAsNullableString('invitee_email');
        if (invitee_email != null)
            criteria.push({ invitee_email: invitee_email });
        
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async deleteByFilter(correlationId: string, filter: FilterParams): Promise<void> {
        return await super.deleteByFilter(correlationId, this.composeFilter(filter));
    }

}
