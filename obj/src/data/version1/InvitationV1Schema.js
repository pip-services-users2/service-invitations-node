"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class InvitationV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('action', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('org_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('org_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('role', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withRequiredProperty('creator_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('creator_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('invitee_email', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('invitee_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('invitee_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('sent_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withOptionalProperty('expire_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
    }
}
exports.InvitationV1Schema = InvitationV1Schema;
//# sourceMappingURL=InvitationV1Schema.js.map