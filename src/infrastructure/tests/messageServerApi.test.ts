import { messagesServerApi } from '../http/features/messageServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { MessageCreateDto } from '../../contracts/message/messageCreateDto.ts';

describe('Integration: messageServerApi', () => {

    let id = ''
    const message:MessageCreateDto = {
        conversation_id: import.meta.env.VITE_TEST_CONVERSATION_ID,
        sender_id: import.meta.env.VITE_TEST_BUYER_ID,
        receiver_id: import.meta.env.VITE_TEST_SELLER_ID,
        content: 'Test content for a fake message',
        is_read: false,
    }

    it('should send a message', async() => {
        const send = await messagesServerApi.sendMessage(message);
        expect(send).not.toBeNull()
        expect(send).toMatchObject(message)
        
        if(send?.id){
            id = send.id
        }
    })

    it('should get coversation messages', async() => {
        const fetched = await messagesServerApi.getConversationMessages(id);
        expect(fetched).not.toBeNull()
    })

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
