import { aiPredictionsServerApi } from '../http/features/ai-predictionsServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { AiPredictionCreateDto } from '../../contracts/ai-prediction/ai-predictionCreateDto.ts';

describe('Integration: ai-predictionServerApi', () => {
    const id = import.meta.env.VITE_TEST_RANDOM_ID //Its in and .env juussssst in case
    const newPrediction:AiPredictionCreateDto = {
        laptop_id: id,
        predicted_price: 12500,
        price_quality_rating:  'good',
        performance_rating: 'high',
        cpu_score: 8,
        recommended_storage_type: 'NVMe',
    };

    it('should create a new prediction', async() => {
        const created = await aiPredictionsServerApi.create(newPrediction);
        expect(created).not.toBeNull();
        expect(created).toMatchObject(newPrediction);
    })

    it('should fetch prediction by laptop Id', async () => {
        const fetched = await aiPredictionsServerApi.getByLaptopId(id);
        expect(fetched).not.toBeNull();
        expect(fetched?.laptop_id).toMatch(id);
    });

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
