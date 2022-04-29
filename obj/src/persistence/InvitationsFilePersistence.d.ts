import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { InvitationsMemoryPersistence } from './InvitationsMemoryPersistence';
import { InvitationV1 } from '../data/version1/InvitationV1';
export declare class InvitationsFilePersistence extends InvitationsMemoryPersistence {
    protected _persister: JsonFilePersister<InvitationV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
