export interface LaptopCreateDto {
    seller_id?: string | null; // UUID, null mientras no esté autenticado o asignado
    title: string;
    brand: string;
    model: string;
    cpu: string;
    ram_gb: number;
    storage_gb: number;
    storage_type: 'HDD' | 'SSD' | 'NVMe' | 'eMMC';
    gpu: string;
    stock: number;
    screen_size: number;
    touch_support: boolean;
    battery_life_hours: number;
    condition: 'new' | 'used' | 'refurbished';
    description: string;
    price: number;
    stock: number;
    image_url: File | null;
}
