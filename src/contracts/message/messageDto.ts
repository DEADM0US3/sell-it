export interface MessageDto {
    id: string;
    conversation_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    sent_at: string;
    is_read: boolean;
}
