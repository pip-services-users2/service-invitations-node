"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
const client_roles_node_1 = require("client-roles-node");
const InvitationsServiceFactory_1 = require("../build/InvitationsServiceFactory");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class InvitationsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("invitations", "User invitations microservice");
        this._factories.add(new InvitationsServiceFactory_1.InvitationsServiceFactory);
        this._factories.add(new client_msgdistribution_node_1.MessageDistributionClientFactory);
        this._factories.add(new client_roles_node_1.RolesClientFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.InvitationsProcess = InvitationsProcess;
//# sourceMappingURL=InvitationsProcess.js.map