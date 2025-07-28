import { supabaseClient } from "../clientProvider.ts";
import type { ConversationDto } from "../../../contracts/conversation/conversationDto.ts";
import type { ConversationCreateDto } from "../../../contracts/conversation/conversationCreateDto.ts";

export class conversationsServerApi {
  static async getByUser(userId: string): Promise<ConversationDto[]> {
    const { data, error } = await supabaseClient
        .from("conversations")
        .select("*")
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

    if (error) {
      console.error("Error getting conversations:", error.message);
      return [];
    }

    return data as ConversationDto[];
  }

  static async create(conversation: ConversationCreateDto): Promise<ConversationDto | null> {
    const { data, error } = await supabaseClient
        .from("conversations")
        .insert(conversation)
        .select()
        .single();

    if (error) {
      console.error("Error creating conversation:", error.message);
      return null;
    }

    return data as ConversationDto;
  }
}
