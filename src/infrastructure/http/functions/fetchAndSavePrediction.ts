import {aiPredictionsServerApi} from "../features/ai-predictionsServerApi.ts";
import type {PredictRequestDto} from "../../../contracts/predict/PredictRequestDto.ts";


export async function fetchAndSavePrediction(laptopId: string, predictRequestBody: PredictRequestDto) {

    const gamaResp = await fetch('http://localhost:8000/models/gama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictRequestBody)
    });
    const gamaData = await gamaResp.json();


    const pricePerfResp = await fetch('http://localhost:8000/models/priceperformance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictRequestBody)
    });

    const pricePerfData = await pricePerfResp.json();

    const aiPredictionPayload = {
        laptop_id: laptopId,
        gama_code: gamaData.gama_code,
        gama_label: gamaData.gama_label,
        predicted_priceperformance: pricePerfData.predicted_priceperformance,
        priceperformance_label: pricePerfData.priceperformance_label
    };

    const createdPrediction = await aiPredictionsServerApi.create(aiPredictionPayload);
    return createdPrediction;
}

export async function predictLaptopPrice(request: PredictRequestDto) {
    const priceResp = await fetch('http://localhost:8000/models/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    const priceData: { predicted_price_mxn: number } = await priceResp.json();
    return priceData.predicted_price_mxn;
}