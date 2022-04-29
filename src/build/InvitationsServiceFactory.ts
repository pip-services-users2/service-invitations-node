import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { InvitationsMongoDbPersistence } from '../persistence/InvitationsMongoDbPersistence';
import { InvitationsFilePersistence } from '../persistence/InvitationsFilePersistence';
import { InvitationsMemoryPersistence } from '../persistence/InvitationsMemoryPersistence';
import { InvitationsController } from '../logic/InvitationsController';
import { InvitationsHttpServiceV1 } from '../services/version1/InvitationsHttpServiceV1';
import { InvitationsCommandableGrpcServiceV1 } from '../services/version1/InvitationsCommandableGrpcServiceV1';
import { InvitationsGrpcServiceV1 } from '../services/version1/InvitationsGrpcServiceV1';

export class InvitationsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-invitations", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-invitations", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-invitations", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-invitations", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-invitations", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-invitations", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-invitations", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-invitations", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(InvitationsServiceFactory.MemoryPersistenceDescriptor, InvitationsMemoryPersistence);
		this.registerAsType(InvitationsServiceFactory.FilePersistenceDescriptor, InvitationsFilePersistence);
		this.registerAsType(InvitationsServiceFactory.MongoDbPersistenceDescriptor, InvitationsMongoDbPersistence);
		this.registerAsType(InvitationsServiceFactory.ControllerDescriptor, InvitationsController);
		this.registerAsType(InvitationsServiceFactory.HttpServiceDescriptor, InvitationsHttpServiceV1);
		this.registerAsType(InvitationsServiceFactory.CommandableGrpcServiceDescriptor, InvitationsCommandableGrpcServiceV1);
		this.registerAsType(InvitationsServiceFactory.GrpcServiceDescriptor, InvitationsGrpcServiceV1);
	}
	
}
