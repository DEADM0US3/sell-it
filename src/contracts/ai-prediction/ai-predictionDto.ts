export interface PredictRequest {
    Status: "New" | "Refurbished";
    Brand: string;
    Model: string;
    CPU: string;
    RAM: number;
    Storage: number;
    Storage_type: "SSD" | "eMMC";
    GPU: string;
    Screen: number;
    Touch: "Yes" | "No";
}
