import {baseServerApi} from "./baseServerApi.ts";
import {supabaseClient} from "../clientProvider.ts";
import type { ProfileCreateDto } from "../../../contracts/profile/profileCreateDto.ts";
import type { ProfileDto } from "../../../contracts/profile/profileDto.ts";

export class profileServerApi extends baseServerApi {

    static async getAll(): Promise<ProfileDto[]> {
        const supabase = supabaseClient;
        const { data, error } = await supabase.from("profiles").select("*");

        if (error) {
            console.error("Error getting all items:", error.message);
            return [];
        }
        return data as ProfileDto[];
    }

    static async create(item:ProfileCreateDto): Promise<ProfileDto | null> {
        const supabase = supabaseClient;
        const { data, error } = await supabase.from("profiles").insert(item).select().single();

        if (error) {
            console.error("Error creating item:", error);
            return null;
        }
        return data as ProfileDto;
    }

}
