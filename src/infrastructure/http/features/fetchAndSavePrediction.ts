import {aiPredictionsServerApi} from "./ai-predictionsServerApi.ts";


export async function fetchAndSavePrediction(laptopId: string, predictRequestBody: any) {
    // Paso 1: Llamar a la API /gama
    const gamaResp = await fetch('http://127.0.0.1:8000/models/gama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictRequestBody)
    });
    const gamaData = await gamaResp.json();

    // Paso 1: Llamar a la API /priceperformance
    const pricePerfResp = await fetch('http://127.0.0.1:8000/models/priceperformance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(predictRequestBody)
    });

    const pricePerfData = await pricePerfResp.json();

    // Paso 2: Crear objeto para insertar en la base
    const aiPredictionPayload = {
        laptop_id: laptopId,
        gama_code: gamaData.gama_code,
        gama_label: gamaData.gama_label,
        predicted_priceperformance: pricePerfData.predicted_priceperformance,
        priceperformance_label: pricePerfData.priceperformance_label
    };

    // Paso 3: Guardar la predicción en Supabase
    const createdPrediction = await aiPredictionsServerApi.create(aiPredictionPayload);
    return createdPrediction;
}
