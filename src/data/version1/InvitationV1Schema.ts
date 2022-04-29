import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class InvitationV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('action', TypeCode.String);
        this.withOptionalProperty('org_id', TypeCode.String);
        this.withOptionalProperty('org_name', TypeCode.String);
        this.withOptionalProperty('role', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withRequiredProperty('creator_id', TypeCode.String);
        this.withOptionalProperty('creator_name', TypeCode.String);
        this.withOptionalProperty('invitee_email', TypeCode.String);
        this.withOptionalProperty('invitee_name', TypeCode.String);
        this.withOptionalProperty('invitee_id', TypeCode.String);
        this.withOptionalProperty('sent_time', TypeCode.DateTime);
        this.withOptionalProperty('expire_time', TypeCode.DateTime);
    }
}
