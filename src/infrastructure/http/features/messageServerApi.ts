import { supabaseClient } from "../clientProvider.ts";
import type {MessageDto} from "../../../contracts/message/messageDto.ts";
import type { MessageCreateDto } from "../../../contracts/message/messageCreateDto.ts";

export class messagesServerApi {
  static async getConversationMessages(conversationId: string): Promise<MessageDto[]> {
    const { data, error } = await supabaseClient
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("sent_at", { ascending: true });

    if (error) {
      console.error("Error getting messages:", error.message);
      return [];
    }

    return data as MessageDto[];
  }

  static async sendMessage(message: MessageCreateDto): Promise<MessageDto | null> {
    const { data, error } = await supabaseClient
        .from("messages")
        .insert(message)
        .select()
        .single();

    if (error) {
      console.error("Error sending message:", error.message);
      return null;
    }

    return data as MessageDto;
  }
}
