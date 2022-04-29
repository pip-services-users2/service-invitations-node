"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.InvitationsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const InvitationsServiceFactory_1 = require("../build/InvitationsServiceFactory");
const client_msgdistribution_node_1 = require("client-msgdistribution-node");
const client_roles_node_1 = require("client-roles-node");
class InvitationsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("invitations", "User invitations function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-invitations', 'controller', 'default', '*', '*'));
        this._factories.add(new client_msgdistribution_node_1.MessageDistributionClientFactory());
        this._factories.add(new client_roles_node_1.RolesClientFactory());
        this._factories.add(new InvitationsServiceFactory_1.InvitationsServiceFactory());
    }
}
exports.InvitationsLambdaFunction = InvitationsLambdaFunction;
exports.handler = new InvitationsLambdaFunction().getHandler();
//# sourceMappingURL=InvitationsLambdaFunction.js.map