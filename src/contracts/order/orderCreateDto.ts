export interface OrderCreateDto {
  buyer_id: string;
  laptop_id: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed';
  price_at_purchase: number;
}
