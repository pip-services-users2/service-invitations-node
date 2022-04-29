const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';
import { RolesNullClientV1 } from 'client-roles-node';

import { InvitationV1 } from '../../../src/data/version1/InvitationV1';
import { InvitationsMemoryPersistence } from '../../../src/persistence/InvitationsMemoryPersistence';
import { InvitationsController } from '../../../src/logic/InvitationsController';
import { InvitationsCommandableGrpcServiceV1 } from '../../../src/services/version1/InvitationsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let INVITATION1: InvitationV1 = {
    id: '1',
    action: 'activate',
    org_id: '1',
    role: 'manager',
    create_time: new Date(),
    creator_id: '1',
    invitee_email: 'test@somewhere.com'
};
let INVITATION2: InvitationV1 = {
    id: '2',
    action: 'activate',
    org_id: '1',
    create_time: new Date(),
    creator_id: '1',
    invitee_email: 'test2@somewhere.com'
};

suite('InvitationsCommandableGrpcServiceV1', ()=> {
    let service: InvitationsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new InvitationsMemoryPersistence();
        let controller = new InvitationsController();

        service = new InvitationsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-invitations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-invitations', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-invitations', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let invitation1, invitation2;

        // Create one invitation
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/invitations.create_invitation',
                    args_empty: false,
                    args_json: JSON.stringify({
                        invitation: INVITATION1
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let invitation = JSON.parse(response.result_json);

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION1.creator_id);
        assert.equal(invitation.org_id, INVITATION1.org_id);
        assert.equal(invitation.invitee_email, INVITATION1.invitee_email);

        invitation1 = invitation;

        // Create another invitation
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/invitations.create_invitation',
                    args_empty: false,
                    args_json: JSON.stringify({
                        invitation: INVITATION2
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        invitation = JSON.parse(response.result_json);

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION2.creator_id);
        assert.equal(invitation.org_id, INVITATION2.org_id);
        assert.equal(invitation.invitee_email, INVITATION2.invitee_email);

        invitation2 = invitation;

        // Get all invitations
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/invitations.get_invitations',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Delete invitation
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/invitations.delete_invitation_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        invitation_id: invitation1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        invitation = JSON.parse(response.result_json);

        assert.isObject(invitation);

        // Try to get delete invitation
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/invitations.get_invitation_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        invitation_id: invitation1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isTrue(response.result_empty);

        // assert.isNull(result);
    });

});
