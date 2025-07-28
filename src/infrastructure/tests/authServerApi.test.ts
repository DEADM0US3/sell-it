import { authServerApi } from '../http/features/authServerApi.ts'
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';

describe('Integration: authServerApi', () => {
    let id = ''
    const user = {
        email: import.meta.env.VITE_TEST_MAIL,
        password: import.meta.env.VITE_TEST_PASS
    }

    it('should register a new test User', async () => {
        const registered = await authServerApi.register(user.email, user.password);
        expect(registered).not.toBeNull();
        
        id = registered
    });

    it('should login the test User', async () => {
        const loggedIn = await authServerApi.login(user.email, user.password);
        expect(loggedIn).toBeTruthy();
    });

    it('should get the test user Id', async () => {
        const response  = await authServerApi.getUserId();
        expect(response).not.toBeNull();
        expect(response).toBe(id);
    });

    it('should change the test user password', async () => {
        const newPassword = 'newPasswordKekeke'
        const response  = await authServerApi.changePassword(newPassword);
        expect(response).toBeTruthy();
    });

    it('should logout the test user', async () => {
        await authServerApi.logout();

        const { data } = await supabaseClient.auth.getSession();
        expect(data.session).toBeNull();
    });

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
