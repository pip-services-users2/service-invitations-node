"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class InvitationsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/invitations');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-invitations', 'controller', 'default', '*', '1.0'));
    }
}
exports.InvitationsCommandableHttpServiceV1 = InvitationsCommandableHttpServiceV1;
//# sourceMappingURL=InvitationsCommandableHttpServiceV1.js.map