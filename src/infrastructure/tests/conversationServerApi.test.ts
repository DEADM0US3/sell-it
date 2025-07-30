import { conversationsServerApi } from '../http/features/conversationServerApi';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { ConversationCreateDto } from '../../contracts/conversation/conversationCreateDto';

describe('Integration: conversationsServerApi', () => {
    const conversation:ConversationCreateDto = {
        buyer_id:import.meta.env.VITE_TEST_BUYER_ID,
        seller_id:import.meta.env.VITE_TEST_SELLER_ID,
        laptop_id:import.meta.env.VITE_TEST_RANDOM_ID
    }

    it('should fetch a conversation', async() => {
        const conversationBuyer = await conversationsServerApi.getByUser(conversation.buyer_id)
        expect(conversationBuyer).not.toBeNull();
        const conversationSeller = await conversationsServerApi.getByUser(conversation.buyer_id)
        expect(conversationSeller).not.toBeNull();

        expect(conversationSeller).toMatchObject(conversationBuyer)
    })

    it('should create a conversation', async () => {
        const fetched = await conversationsServerApi.create(conversation)
        expect(fetched).not.toBeNull();
    });

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
