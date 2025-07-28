import { userServerApi } from '../http/features/userServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';

describe('Integration: userServerApi', () => {
    const user = {
        name:'John Doe',
        email:'updatedMail@team.com'
    }

    it('should fetch a user', async() => {
        const fetched = await userServerApi.get();
        expect(fetched).not.toBeNull();
    })

    it('should update a user', async () => {
        const fetched = await userServerApi.update(user.name, user.email);
        expect(fetched).not.toBeNull();
    });

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
