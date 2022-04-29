import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { InvitationsServiceFactory } from '../build/InvitationsServiceFactory';
import { MessageDistributionClientFactory } from 'client-msgdistribution-node';
import { RolesClientFactory } from 'client-roles-node';

export class InvitationsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("invitations", "User invitations function");
        this._dependencyResolver.put('controller', new Descriptor('service-invitations', 'controller', 'default', '*', '*'));
        this._factories.add(new MessageDistributionClientFactory());
        this._factories.add(new RolesClientFactory());
        this._factories.add(new InvitationsServiceFactory());
    }
}

export const handler = new InvitationsLambdaFunction().getHandler();