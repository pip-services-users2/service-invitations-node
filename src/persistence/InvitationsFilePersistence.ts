import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { InvitationsMemoryPersistence } from './InvitationsMemoryPersistence';
import { InvitationV1 } from '../data/version1/InvitationV1';

export class InvitationsFilePersistence extends InvitationsMemoryPersistence {
	protected _persister: JsonFilePersister<InvitationV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<InvitationV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}