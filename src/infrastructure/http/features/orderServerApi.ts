
import { supabaseClient } from "../clientProvider.ts";
import type {OrderDto} from "../../../contracts/order/orderDto.ts";
import type { OrderCreateDto } from "../../../contracts/order/orderCreateDto.ts";


export class ordersServerApi {
  static async create(order: OrderCreateDto): Promise<OrderDto | null> {
    const { data, error } = await supabaseClient
        .from("orders")
        .insert(order)
        .select()
        .single();

    if (error) {
      console.error("Error creating order:", error.message);
      return null;
    }

    return data as OrderDto;
  }

  static async getByUser(userId: string): Promise<OrderDto[]> {
    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("buyer_id", userId);

    if (error) {
      console.error("Error fetching orders:", error.message);
      return [];
    }

    return data as OrderDto[];
  }

  static async updateStatus(orderId: string, status: OrderDto["status"]): Promise<OrderDto | null> {
    const { data, error } = await supabaseClient
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

    if (error) {
      console.error("Error updating order status:", error.message);
      return null;
    }

    return data as OrderDto;
  }
}
