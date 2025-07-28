import { messagesServerApi } from '../http/features/messageServerApi';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { MessageCreateDto } from '../../contracts/message/messageCreateDto';

describe('Integration: messageServerApi', () => {

    const id = ''
    const message:MessageCreateDto = {
        conversation_id: '',
        sender_id: '',
        receiver_id: '',
        content: 'Test contebto for a fake message',
        is_read: false,
    }

    it('should get coversation messages', async() => {
        const fetched = await messagesServerApi.getConversationMessages(id);
        expect(fetched).not.toBeNull()
    })

    it('should send a message', async() => {
        const send = await messagesServerApi.sendMessage(message);
        expect(send).not.toBeNull()
        expect(send).toMatchObject(message)
    })

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
