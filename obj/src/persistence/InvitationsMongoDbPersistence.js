"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class InvitationsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('invitations');
        this.ensureIndex({ invitee_email: 1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    deleteByFilter(correlationId, filter) {
        const _super = Object.create(null, {
            deleteByFilter: { get: () => super.deleteByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.deleteByFilter.call(this, correlationId, this.composeFilter(filter));
        });
    }
}
exports.InvitationsMongoDbPersistence = InvitationsMongoDbPersistence;
//# sourceMappingURL=InvitationsMongoDbPersistence.js.map