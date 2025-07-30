export interface SaleDto {
    id: string;                // UUID de la venta
    orderId: string;           // UUID de la orden asociada
    buyerId?: string | null;   // UUID del comprador, puede ser null si el perfil fue eliminado
    sellerId?: string | null;  // UUID del vendedor, puede ser null si el perfil fue eliminado
    laptopId?: string | null;  // UUID de la laptop vendida, puede ser null si el registro fue eliminado
    salePrice: number;         // Precio final de la venta
    saleDate: string;          // Fecha ISO de la venta (timestamptz)
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash'; // Forma de pago
    status: 'pending' | 'completed' | 'cancelled' | 'refunded';         // Estado de la venta
    trackingNumber?: string | null; // Número de seguimiento, opcional
    createdAt: string;         // Fecha ISO de creación del registro
    updatedAt: string;         // Fecha ISO de última actualización
}

export interface SaleCreateDto {
    orderId: string;
    buyerId?: string | null;
    sellerId?: string | null;
    laptopId?: string | null;
    salePrice: number;
    saleDate?: string; // opcional, si no se envía, el backend puede asignar now()
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
    status?: 'pending' | 'completed' | 'cancelled' | 'refunded'; // opcional, default 'pending'
    trackingNumber?: string | null;
}

export interface SaleUpdateDto {
    id: string; // obligatorio para actualizar
    orderId?: string;
    buyerId?: string | null;
    sellerId?: string | null;
    laptopId?: string | null;
    salePrice?: number;
    saleDate?: string;
    paymentMethod?: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
    status?: 'pending' | 'completed' | 'cancelled' | 'refunded';
    trackingNumber?: string | null;
}
