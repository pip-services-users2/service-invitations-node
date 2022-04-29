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
exports.InvitationsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class InvitationsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
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
exports.InvitationsMemoryPersistence = InvitationsMemoryPersistence;
//# sourceMappingURL=InvitationsMemoryPersistence.js.map