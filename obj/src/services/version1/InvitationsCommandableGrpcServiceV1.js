"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class InvitationsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/invitations');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-invitations', 'controller', 'default', '*', '1.0'));
    }
}
exports.InvitationsCommandableGrpcServiceV1 = InvitationsCommandableGrpcServiceV1;
//# sourceMappingURL=InvitationsCommandableGrpcServiceV1.js.map