const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../../src/data/version1/InvitationV1';
import { InvitationsMemoryPersistence } from '../../../src/persistence/InvitationsMemoryPersistence';
import { InvitationsController } from '../../../src/logic/InvitationsController';
import { InvitationsCommandableHttpServiceV1 } from '../../../src/services/version1/InvitationsCommandableHttpServiceV1';

import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';
import { RolesNullClientV1 } from 'client-roles-node';

let httpConfig = ConfigParams.fromTuples(
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

suite('InvitationsCommandableHttpServiceV1', ()=> {
    let service: InvitationsCommandableHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new InvitationsMemoryPersistence();
        let controller = new InvitationsController();

        service = new InvitationsCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-invitations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-invitations', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-invitations', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', async () => {
        let invitation1, invitation2;

        // Create one invitation
        invitation1 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/invitations/create_invitation',
                {
                    invitation: INVITATION1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(invitation1);
        assert.equal(invitation1.creator_id, INVITATION1.creator_id);
        assert.equal(invitation1.org_id, INVITATION1.org_id);
        assert.equal(invitation1.invitee_email, INVITATION1.invitee_email);

        // Create another invitation
        invitation2 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/invitations/create_invitation',
                {
                    invitation: INVITATION2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(invitation2);
        assert.equal(invitation2.creator_id, INVITATION2.creator_id);
        assert.equal(invitation2.org_id, INVITATION2.org_id);
        assert.equal(invitation2.invitee_email, INVITATION2.invitee_email);

        // Get all invitations
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/invitations/get_invitations',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Delete invitation
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/invitations/delete_invitation_by_id',
                {
                    invitation_id: invitation1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete invitation
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/invitations/get_invitation_by_id',
                {
                    invitation_id: invitation1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

    });
});