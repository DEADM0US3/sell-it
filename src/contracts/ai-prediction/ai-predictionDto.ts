export interface AiPredictionDto {
    id: string;
    laptop_id: string;
    predicted_price: number;
    price_quality_rating: 'excellent' | 'good' | 'poor';
    performance_rating: 'low' | 'medium' | 'high';
    cpu_score: number;
    recommended_storage_type: 'HDD' | 'SSD' | 'NVMe';
    created_at: string;
}
