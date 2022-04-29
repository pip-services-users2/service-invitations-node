const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../src/data/version1/InvitationV1';
import { InvitationsLambdaFunction } from '../../src/container/InvitationsLambdaFunction';

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

suite('InvitationsLambdaFunction', ()=> {
    let lambda: InvitationsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-invitations:persistence:memory:default:1.0',
            'controller.descriptor', 'service-invitations:controller:default:default:1.0',
            'msgdistribution.descriptor', 'service-msgdistribution:client:null:default:1.0',
            'roles.descriptor', 'service-roles:client:null:default:1.0'
        );

        lambda = new InvitationsLambdaFunction();
        lambda.configure(config);
        lambda.open(null);
    });
    
    suiteTeardown(async () => {
        lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var invitation1, invitation2;

        // Create one invitation
        invitation1 = await lambda.act(
            {
                role: 'invitations',
                cmd: 'create_invitation',
                invitation: INVITATION1
            }
        );

        assert.isObject(invitation1);
        assert.equal(invitation1.creator_id, INVITATION1.creator_id);
        assert.equal(invitation1.org_id, INVITATION1.org_id);
        assert.equal(invitation1.invitee_email, INVITATION1.invitee_email);

        // Create another invitation
        invitation2 = await lambda.act(
            {
                role: 'invitations',
                cmd: 'create_invitation',
                invitation: INVITATION2
            }
        );

        assert.isObject(invitation2);
        assert.equal(invitation2.creator_id, INVITATION2.creator_id);
        assert.equal(invitation2.org_id, INVITATION2.org_id);
        assert.equal(invitation2.invitee_email, INVITATION2.invitee_email);

        // Get all invitations
        let page = await lambda.act(
            {
                role: 'invitations',
                cmd: 'get_invitations'
            }
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        
        // Delete invitation
        await lambda.act(
            {
                role: 'invitations',
                cmd: 'delete_invitation_by_id',
                invitation_id: invitation1.id
            }
        );

        // Try to get delete invitation
        let invitation = await lambda.act(
            {
                role: 'invitations',
                cmd: 'get_invitation_by_id',
                invitation_id: invitation1.id
            }
        );

        assert.isNull(invitation || null);
    });
});