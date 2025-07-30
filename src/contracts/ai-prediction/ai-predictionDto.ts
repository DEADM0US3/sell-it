export interface AiPredictionDto {
    id: string; // UUID
    laptop_id: string; // UUID que referencia a laptops.id
    gama_code: number;
    gama_label: 'baja' | 'media' | 'alta';
    predicted_priceperformance: number;
    priceperformance_label: 'yes' | 'no';
}
