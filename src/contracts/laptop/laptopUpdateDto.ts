export interface LaptopUpdateDto {
    id: string;
    title: string;
    brand: string;
    model: string;
    cpu: string;
    ram_gb: number;
    storage_gb: number;
    storage_type: 'HDD' | 'SSD' | 'NVMe';
    gpu: string;
    screen_size: number;
    battery_life_hours: number;
    condition: 'new' | 'used';
    description: string;
    price: number;
    updated_at?: string;
}
