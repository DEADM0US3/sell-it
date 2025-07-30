export interface PredictRequestDto {
    Model: string
    status: 'New' | 'Refurbished';
    brand: string;
    cpu: string;
    ram: number;
    storage: number;
    storage_type: 'SSD' | 'eMMC';
    gpu: string;
    screen_size: number;
    touch_support: boolean;
}
