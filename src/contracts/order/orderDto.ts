export interface OrderDto {
    id: string;
    buyer_id: string;
    laptop_id: string;
    status: 'pending' | 'paid' | 'shipped' | 'completed';
    price_at_purchase: number;
    created_at: string;
    updated_at: string;
}