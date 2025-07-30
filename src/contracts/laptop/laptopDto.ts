export interface LaptopDto {
    id: string;
    seller_id: string;
    title: string;
    brand: string;
    model: string;
    cpu: string;
    ram_gb: number;
    storage_gb: number;
    storage_type: 'HDD' | 'SSD' | 'NVMe' | 'eMMC';
    gpu: string;
    screen_size: number;
    touch_support: boolean;
    battery_life_hours: number;
    condition: 'new' | 'used' | 'refurbished';
    description: string;
    price: number;
    image_url: string;
    created_at: string;
    updated_at: string;
}
