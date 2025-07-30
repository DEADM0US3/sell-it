import { baseServerApi } from "./baseServerApi.ts";
import { supabaseClient } from "../clientProvider.ts";
import type {SaleCreateDto, SaleDto, SaleUpdateDto} from "../../../contracts/sales/salesDto.ts";

export class salesServerApi extends baseServerApi {

    static async getAll(): Promise<SaleDto[]> {
        const supabase = supabaseClient;
        const { data, error } = await supabase.from("sales").select("*");

        if (error) {
            console.error("Error getting all sales:", error.message);
            return [];
        }

        return data as SaleDto[];
    }

    static async create(item: SaleCreateDto): Promise<SaleDto | null> {
        if (!(await this.validateLogin())) {
            console.error("User is not logged in.");
            return null;
        }

        const supabase = supabaseClient;
        const { data, error } = await supabase
            .from("sales")
            .insert(item)
            .select()
            .single();

        if (error) {
            console.error("Error creating sale:", error.message);
            return null;
        }

        return data as SaleDto;
    }

    static async update(item: SaleUpdateDto): Promise<SaleDto | null> {
        if (!(await this.validateLogin())) {
            console.error("User is not logged in.");
            return null;
        }

        const supabase = supabaseClient;
        const { data, error } = await supabase
            .from("sales")
            .update(item)
            .eq("id", item.id)
            .select()
            .single();

        if (error) {
            console.error("Error updating sale:", error.message);
            return null;
        }

        return data as SaleDto;
    }

    static async delete(id: string): Promise<boolean | null> {
        if (!(await this.validateLogin())) {
            console.error("User is not logged in.");
            return null;
        }

        const supabase = supabaseClient;
        const { error } = await supabase.from("sales").delete().eq("id", id);

        if (error) {
            console.error("Error deleting sale:", error.message);
            return null;
        }
        return true;
    }

    static async getById(id: string): Promise<SaleDto | null> {
        const supabase = supabaseClient;
        const { data, error } = await supabase.from("sales").select("*").eq("id", id).single();

        if (error) {
            console.error("Error getting sale by ID:", error.message);
            return null;
        }

        return data as SaleDto;
    }

    static async getByBuyerId(buyerId: string): Promise<SaleDto[] | null> {
        if (!(await this.validateLogin())) {
            console.error("User is not logged in.");
            return null;
        }

        const supabase = supabaseClient;
        const { data, error } = await supabase.from("sales").select("*").eq("buyer_id", buyerId);

        if (error) {
            console.error("Error getting sales by buyer ID:", error.message);
            return null;
        }

        return data as SaleDto[];
    }

    static async getBySellerId(sellerId: string): Promise<SaleDto[] | null> {
        if (!(await this.validateLogin())) {
            console.error("User is not logged in.");
            return null;
        }

        const supabase = supabaseClient;
        const { data, error } = await supabase.from("sales").select("*").eq("seller_id", sellerId);

        if (error) {
            console.error("Error getting sales by seller ID:", error.message);
            return null;
        }

        return data as SaleDto[];
    }
}
