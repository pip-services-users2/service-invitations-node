"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const InvitationsMongoDbPersistence_1 = require("../persistence/InvitationsMongoDbPersistence");
const InvitationsFilePersistence_1 = require("../persistence/InvitationsFilePersistence");
const InvitationsMemoryPersistence_1 = require("../persistence/InvitationsMemoryPersistence");
const InvitationsController_1 = require("../logic/InvitationsController");
const InvitationsCommandableHttpServiceV1_1 = require("../services/version1/InvitationsCommandableHttpServiceV1");
const InvitationsCommandableGrpcServiceV1_1 = require("../services/version1/InvitationsCommandableGrpcServiceV1");
const InvitationsGrpcServiceV1_1 = require("../services/version1/InvitationsGrpcServiceV1");
class InvitationsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(InvitationsServiceFactory.MemoryPersistenceDescriptor, InvitationsMemoryPersistence_1.InvitationsMemoryPersistence);
        this.registerAsType(InvitationsServiceFactory.FilePersistenceDescriptor, InvitationsFilePersistence_1.InvitationsFilePersistence);
        this.registerAsType(InvitationsServiceFactory.MongoDbPersistenceDescriptor, InvitationsMongoDbPersistence_1.InvitationsMongoDbPersistence);
        this.registerAsType(InvitationsServiceFactory.ControllerDescriptor, InvitationsController_1.InvitationsController);
        this.registerAsType(InvitationsServiceFactory.CmdHttpServiceDescriptor, InvitationsCommandableHttpServiceV1_1.InvitationsCommandableHttpServiceV1);
        this.registerAsType(InvitationsServiceFactory.CommandableGrpcServiceDescriptor, InvitationsCommandableGrpcServiceV1_1.InvitationsCommandableGrpcServiceV1);
        this.registerAsType(InvitationsServiceFactory.GrpcServiceDescriptor, InvitationsGrpcServiceV1_1.InvitationsGrpcServiceV1);
    }
}
exports.InvitationsServiceFactory = InvitationsServiceFactory;
InvitationsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "factory", "default", "default", "1.0");
InvitationsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "persistence", "memory", "*", "1.0");
InvitationsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "persistence", "file", "*", "1.0");
InvitationsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "persistence", "mongodb", "*", "1.0");
InvitationsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "controller", "default", "*", "1.0");
InvitationsServiceFactory.CmdHttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "service", "commandable-http", "*", "1.0");
InvitationsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "service", "commandable-grpc", "*", "1.0");
InvitationsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-invitations", "service", "grpc", "*", "1.0");
//# sourceMappingURL=InvitationsServiceFactory.js.map