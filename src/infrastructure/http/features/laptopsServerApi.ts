    import {baseServerApi} from "./baseServerApi.ts";
    import {supabaseClient} from "../clientProvider.ts";
    import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
    import type {LaptopCreateDto} from "../../../contracts/laptop/laptopCreateDto.ts";

    export class laptopsServerApi extends baseServerApi {

        static async getAll(): Promise<LaptopDto[]> {
            const supabase = supabaseClient;

            const { data, error } = await supabase.from("items").select("*");

            if (error) {
                console.error("Error getting all items:", error.message);
                return [];
            }

            return data as LaptopDto[];
        }

        static async create(item: LaptopCreateDto): Promise<LaptopDto | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("items").insert(item).select().single();

            if (error) {
                console.error("Error creating item:", error.message);
                return null;
            }

            return data as LaptopDto;
        }

        static async delete(id: string): Promise<void | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { error } = await supabase.from("items").delete().eq("id", id);

            if (error) {
                console.error("Error deleting item:", error.message);
                return null;
            }
        }

        static async update(item: LaptopDto): Promise<LaptopDto | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("items").update(item).eq("id", item.id).select().single();

            if (error) {
                console.error("Error updating item:", error.message);
                return null;
            }

            return data as LaptopDto;
        }

        static async getByUserId(userId: string): Promise<LaptopDto[] | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("items").select("*").eq("user_id", userId);

            if (error) {
                console.error("Error getting item by user ID:", error.message);
                return null;
            }

            return data as LaptopDto[];
        }

        static async getById(id: string): Promise<LaptopDto | null> {
            const supabase = supabaseClient;
            const { data, error } = await supabase.from("items").select("*").eq("id", id).single();

            if (error) {
                console.error("Error getting item by ID:", error.message);
                return null;
            }

            return data as LaptopDto;
        }
    }
