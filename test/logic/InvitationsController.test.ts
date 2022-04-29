const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../src/data/version1/InvitationV1';
import { InvitationsMemoryPersistence } from '../../src/persistence/InvitationsMemoryPersistence';
import { InvitationsController } from '../../src/logic/InvitationsController';

import { MessageDistributionNullClientV1 } from 'client-msgdistribution-node';
import { RolesNullClientV1 } from 'client-roles-node';

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
    action: 'approve',
    org_id: '1',
    create_time: new Date(),
    creator_id: '1',
    invitee_id: '1'
};

suite('InvitationsController', ()=> {
    let persistence = new InvitationsMemoryPersistence();
    let controller = new InvitationsController();

    suiteSetup(async () => {
        controller.configure(new ConfigParams());

        let references: References = References.fromTuples(
            new Descriptor('service-msgdistribution', 'client', 'null', 'default', '1.0'), new MessageDistributionNullClientV1(),
            new Descriptor('service-roles', 'client', 'null', 'default', '1.0'), new RolesNullClientV1(),
            new Descriptor('service-invitations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-invitations', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);

        //controller.open(null, done);
    });
    
    suiteTeardown(async () => {
        //controller.close(null, done);
    });

    setup(async () => {
        await persistence.clear(null);
    });
    
    test('CRUD Operations', async () => {
        let invitation1, invitation2: InvitationV1;

        // Create one invitation
        invitation1 = await controller.createInvitation(null, INVITATION1);

        assert.isObject(invitation1);
        assert.equal(invitation1.creator_id, INVITATION1.creator_id);
        assert.equal(invitation1.org_id, INVITATION1.org_id);
        assert.equal(invitation1.invitee_email, INVITATION1.invitee_email);

        // Create another invitation
        invitation2 = await controller.createInvitation(null, INVITATION2);

        assert.isObject(invitation2);
        assert.equal(invitation2.creator_id, INVITATION2.creator_id);
        assert.equal(invitation2.org_id, INVITATION2.org_id);
        assert.equal(invitation2.invitee_email, INVITATION2.invitee_email);

        // Get all invitations
        let page = await controller.getInvitations(null, null, null);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Delete invitation
        let result = await controller.deleteInvitationById(null, invitation1.id);

        assert.equal(result.id, invitation1.id);

        // Try to get delete invitation
        result = await controller.getInvitationById(null, invitation1.id);

        assert.isNull(result);
    });

    test('Resend and activate', async () => {

        // Create invitation
        let invitation1: InvitationV1 = await controller.createInvitation(null, INVITATION1);

        assert.isObject(invitation1);
        assert.equal(invitation1.creator_id, INVITATION1.creator_id);
        assert.equal(invitation1.org_id, INVITATION1.org_id);
        assert.equal(invitation1.invitee_email, INVITATION1.invitee_email);

        // Resend invitation
        let invitation = await controller.resendInvitation(null, invitation1.id);

        assert.isObject(invitation);
        assert.equal(invitation.id, invitation1.id);

        // Activate invitations
        let invitations = await controller.activateInvitations(null, INVITATION1.invitee_email, '1');

        assert.lengthOf(invitations, 1);

        // Try to get activated invitation
        let result = await controller.getInvitationById(null, invitation1.id);

        assert.isNull(result);
    });

    test('Approve', async () => {
        
        // Create invitation
        let invitation1 = await controller.createInvitation(null, INVITATION2);
        
        assert.isObject(invitation1);
        assert.equal(invitation1.creator_id, INVITATION2.creator_id);
        assert.equal(invitation1.org_id, INVITATION2.org_id);
        assert.equal(invitation1.invitee_id, INVITATION2.invitee_id);

        // Respond invitation
        let invitation = await controller.approveInvitation(null, invitation1.id, 'admin');

        assert.isObject(invitation);
        assert.equal(invitation.id, invitation1.id);

        // Try to get activated invitation
        let result = await controller.getInvitationById(null, invitation1.id);

        assert.isNull(result);
    });

});