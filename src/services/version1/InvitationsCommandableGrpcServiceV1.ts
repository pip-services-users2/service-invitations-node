import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class InvitationsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/invitations');
        this._dependencyResolver.put('controller', new Descriptor('service-invitations', 'controller', 'default', '*', '1.0'));
    }
}