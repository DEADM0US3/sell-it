    import {baseServerApi} from "./baseServerApi.ts";
    import {supabaseClient} from "../clientProvider.ts";
    import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
    import type {LaptopCreateDto} from "../../../contracts/laptop/laptopCreateDto.ts";
    import type { LaptopUpdateDto } from "../../../contracts/laptop/laptopUpdateDto.ts";
    import {imageServerApi} from "./imageServerApi.ts";

    export class laptopsServerApi extends baseServerApi {

        static async getAll(): Promise<LaptopDto[]> {
            const supabase = supabaseClient;

            const { data, error } = await supabase.from("laptops").select("*");

            if (error) {
                console.error("Error getting all items:", error.message);
                return [];
            }

            return data as LaptopDto[];
        }

        static async create(item: LaptopCreateDto, file : File): Promise<LaptopDto | null> {

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("laptops").insert(item).select().single();

            const imageUrl = await imageServerApi.uploadImage(file)

            item.

            if (error) {
                console.error("Error creating item:", error);
                return null;
            }

            return data as LaptopDto;
        }

        static async delete(id: string): Promise<boolean | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { error } = await supabase.from("laptops").delete().eq("id", id);

            if (error) {
                console.error("Error deleting item:", error.message);
                return null;
            }
            return true
        }

        static async update(item: LaptopUpdateDto): Promise<LaptopDto | null> {
            if (await this.validateLogin()) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("laptops").update(item).eq("id", item.id).select().single();

            if (error) {
                console.error("Error updating item:", error.message);
                return null;
            }

            return data as LaptopDto;
        }

        static async getByUserId(userId: string): Promise<LaptopDto[] | null> {
            if (!(await this.validateLogin())) {
                console.error("User is not logged in.");
                return null;
            }

            const supabase = supabaseClient;
            const { data, error } = await supabase.from("laptops").select("*").eq("seller_id", userId);

            if (error) {
                console.error("Error getting item by user ID:", error.message);
                return null;
            }

            return data as LaptopDto[];
        }

        static async getById(id: string): Promise<LaptopDto | null> {
            const supabase = supabaseClient;
            const { data, error } = await supabase.from("laptops").select("*").eq("id", id).single();

            if (error) {
                console.error("Error getting item by ID:", error.message);
                return null;
            }

            return data as LaptopDto;
        }
    }
