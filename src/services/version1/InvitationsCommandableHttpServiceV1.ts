import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class InvitationsCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/invitations');
        this._dependencyResolver.put('controller', new Descriptor('service-invitations', 'controller', 'default', '*', '1.0'));
    }
}