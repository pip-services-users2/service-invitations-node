"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const InvitationsMemoryPersistence_1 = require("./InvitationsMemoryPersistence");
class InvitationsFilePersistence extends InvitationsMemoryPersistence_1.InvitationsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.InvitationsFilePersistence = InvitationsFilePersistence;
//# sourceMappingURL=InvitationsFilePersistence.js.map