import { ConfigParams } from 'pip-services3-commons-nodex';

import { InvitationsFilePersistence } from '../../src/persistence/InvitationsFilePersistence';
import { InvitationsPersistenceFixture } from './InvitationsPersistenceFixture';

suite('InvitationsFilePersistence', ()=> {
    let persistence: InvitationsFilePersistence;
    let fixture: InvitationsPersistenceFixture;
    
    setup(async () => {
        persistence = new InvitationsFilePersistence('./data/invitations.test.json');

        fixture = new InvitationsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});