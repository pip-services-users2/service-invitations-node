"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class InvitationsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/invitations');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-invitations', 'controller', 'default', '*', '1.0'));
    }
}
exports.InvitationsHttpServiceV1 = InvitationsHttpServiceV1;
//# sourceMappingURL=InvitationsHttpServiceV1.js.map