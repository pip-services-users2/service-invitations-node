import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';

import { MessageDistributionClientFactory } from 'client-msgdistribution-node';
import { RolesClientFactory } from 'client-roles-node';

import { InvitationsServiceFactory } from '../build/InvitationsServiceFactory';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class InvitationsProcess extends ProcessContainer {

    public constructor() {
        super("invitations", "User invitations microservice");
        this._factories.add(new InvitationsServiceFactory);
        this._factories.add(new MessageDistributionClientFactory);
        this._factories.add(new RolesClientFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }


}
