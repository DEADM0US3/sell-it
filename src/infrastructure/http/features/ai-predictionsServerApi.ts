import { supabaseClient } from "../clientProvider.ts";
import type {AiPredictionDto} from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import type { AiPredictionCreateDto } from "../../../contracts/ai-prediction/ai-predictionCreateDto.ts";
export class aiPredictionsServerApi {
  static async getByLaptopId(laptopId: string): Promise<AiPredictionDto | null> {
    const { data, error } = await supabaseClient
        .from("ai_predictions")
        .select("*")
        .eq("laptop_id", laptopId).limit(1)
        .maybeSingle()
        
    console.log("Laptop ID type:", typeof laptopId);
    console.log("Laptop ID:", JSON.stringify(laptopId));
    if (error) {
      console.error("Error fetching prediction:", error.message);
      return null;
    }

    return data as AiPredictionDto;
  }

  static async create(prediction: AiPredictionCreateDto): Promise<AiPredictionDto | null> {
    const { data, error } = await supabaseClient
        .from("ai_predictions")
        .insert(prediction)
        .select()
        .single();

    if (error) {
      console.error("Error creating prediction:", error.message);
      return null;
    }

    return data as AiPredictionDto;
  }
}
