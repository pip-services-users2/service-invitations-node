const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../src/data/version1/InvitationV1';

import { IInvitationsPersistence } from '../../src/persistence/IInvitationsPersistence';

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
let INVITATION3: InvitationV1 = {
    id: '3',
    action: 'approve',
    org_id: '2',
    create_time: new Date(),
    creator_id: '3',
    invitee_id: '1'
};

export class InvitationsPersistenceFixture {
    private _persistence: IInvitationsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateInvitations() {
        // Create one invitation
        let invitation = await this._persistence.create(null, INVITATION1);

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION1.creator_id);
        assert.equal(invitation.action, INVITATION1.action);
        assert.equal(invitation.org_id, INVITATION1.org_id);
        assert.equal(invitation.role, INVITATION1.role);
        assert.equal(invitation.invitee_email, INVITATION1.invitee_email);

        // Create another invitation
        invitation = await this._persistence.create(null, INVITATION2);

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION2.creator_id);
        assert.equal(invitation.action, INVITATION2.action);
        assert.equal(invitation.org_id, INVITATION2.org_id);
        assert.equal(invitation.invitee_email, INVITATION2.invitee_email);

        // Create yet another invitation
        invitation = await this._persistence.create(null, INVITATION3);

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION3.creator_id);
        assert.equal(invitation.action, INVITATION3.action);
        assert.equal(invitation.org_id, INVITATION3.org_id);
        assert.equal(invitation.invitee_id, INVITATION3.invitee_id);
    }
                
    public async testCrudOperations() {
        let invitation1: InvitationV1;

        // Create items
        await this.testCreateInvitations();

        // Get all invitations
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        invitation1 = page.data[0];

        // Delete invitation
        await this._persistence.deleteById(null, invitation1.id);

        // Try to get delete invitation
        let invitation = await this._persistence.getOneById(null, invitation1.id);

        assert.isNull(invitation || null);
    }

    public async testGetWithFilter() {

        // Create invitations
        await this.testCreateInvitations();

        // Get invitations by invitee email
        let invitations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                invitee_email: 'test@somewhere.com'
            }),
            new PagingParams()
        );

        assert.isObject(invitations);
        assert.lengthOf(invitations.data, 1);

        // Get invitations by invitee id
        invitations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                invitee_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(invitations);
        assert.lengthOf(invitations.data, 1);

        // Get invitations by type
        invitations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                type: 'approve'
            }),
            new PagingParams()
        );

        assert.isObject(invitations);
        assert.lengthOf(invitations.data, 1);

        // Get invitations except certain ids
        invitations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                org_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(invitations);
        assert.lengthOf(invitations.data, 2);
    }
}
