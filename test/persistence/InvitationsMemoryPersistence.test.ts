import { ConfigParams } from 'pip-services3-commons-nodex';

import { InvitationsMemoryPersistence } from '../../src/persistence/InvitationsMemoryPersistence';
import { InvitationsPersistenceFixture } from './InvitationsPersistenceFixture';

suite('InvitationsMemoryPersistence', ()=> {
    let persistence: InvitationsMemoryPersistence;
    let fixture: InvitationsPersistenceFixture;
    
    setup(async () => {
        persistence = new InvitationsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new InvitationsPersistenceFixture(persistence);
        
        await persistence.open(null);
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