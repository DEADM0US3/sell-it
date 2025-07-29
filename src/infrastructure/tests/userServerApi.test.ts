import { userServerApi } from '../http/features/userServerApi.ts';
import { authServerApi } from '../http/features/authServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';

describe('Integration: userServerApi', () => {
    const user = {
        email: import.meta.env.VITE_TEST_MAIL_OLD,
        password: import.meta.env.VITE_TEST_PASS_OLD
    }
    const updatedUser = {
        name:'John Doe',
        email:'updatedMail@team.com'
    }

    it('should fetch a user', async() => {
        await authServerApi.login(user.email, user.password);

        const fetched = await userServerApi.get();
        expect(fetched).not.toBeNull();
    })

    it('should update a user', async () => {
        const fetched = await userServerApi.update(updatedUser.name, updatedUser.email);
        expect(fetched).not.toBeNull();
    });

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
