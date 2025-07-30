import { supabaseClient } from "../clientProvider.ts";
import type {AiPredictionDto} from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import type { AiPredictionCreateDto } from "../../../contracts/ai-prediction/ai-predictionCreateDto.ts";


export class aiPredictionsServerApi {

  static async getByLaptopId(laptopId: string): Promise<AiPredictionDto | null> {
    if (!laptopId || typeof laptopId !== "string") {
      console.warn("Invalid laptopId provided:", laptopId);
      return null;
    }

    const { data, error } = await supabaseClient
        .from("ai_predictions")
        .select("*")
        .eq("laptop_id", laptopId)
        .limit(1)
        .maybeSingle();

    if (error) {
      console.error(`[getByLaptopId] Supabase error: ${error.message}`, { laptopId });
      return null;
    }

    return data as AiPredictionDto;
  }


  static async create(prediction: AiPredictionCreateDto): Promise<AiPredictionDto | null> {
    if (!prediction?.laptop_id) {
      console.warn("Missing laptop_id in prediction payload");
      return null;
    }

    const { data, error } = await supabaseClient
        .from("ai_predictions")
        .insert(prediction)
        .select()
        .single();

    if (error) {
      console.error(`[create] Supabase error: ${error.message}`, { prediction });
      return null;
    }

    return data as AiPredictionDto;
  }
}
