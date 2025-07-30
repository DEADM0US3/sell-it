import React, { useEffect, useState } from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import { CardDetail } from './components/CardDetails.tsx';
import { laptopsServerApi } from "../../../infrastructure/http/features/laptopsServerApi.ts";
import { useParams } from "react-router-dom";
import type { LaptopDto } from "../../../contracts/laptop/laptopDto.ts";
import type {AiPredictionDto} from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import {aiPredictionsServerApi} from "../../../infrastructure/http/features/ai-predictionsServerApi.ts";

const ProductsView: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const [laptop, setLaptop] = useState<LaptopDto | null>(null);
    const [prediction, setPrediction] = useState<AiPredictionDto | null>(null);

    useEffect(() => {
        const fetchLaptop = async () => {
            if (id) {
                try {
                    const fetchedLaptop = await laptopsServerApi.getById(id);
                    setLaptop(fetchedLaptop);
                } catch (error) {
                    console.error("Error fetching laptop:", error);
                }
            }
        };

        fetchLaptop();
    }, [id]);

    useEffect(() => {
        const fetchLaptop = async () => {
            if (id) {
                try {
                    const fetchedLaptop = await aiPredictionsServerApi.getByLaptopId(id);

                    setPrediction(fetchedLaptop);
                } catch (error) {
                    console.error("Error fetching laptop:", error);
                }
            }
        };

        fetchLaptop();
    }, [id]);

    return (
        <BeginContainerStyle>
            <div className="flex justify-between items-center px-40 py-5">
                <CardDetail laptop={laptop} />
            </div>

            {laptop ? (
                <div className='w-[90vw] md:w-[60vw] my-[10vh] mx-auto flex flex-col items-center md:items-start text-[#14479D]'>
                    <h2 className='text-left w-full text-2xl font-semibold'>
                        {laptop.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">{laptop.brand} - {laptop.cpu}</p>
                    <p className='text-center md:text-justify w-full'>
                        {laptop.description}
                    </p>

                    {prediction && (
                        <div className="mt-10 w-full bg-[#F3F8FF] border border-[#B3D4FC] rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-bold text-[#21519F] mb-4">Analisis de producto con IA</h3>
                            <p><span className="font-semibold">Gama estimada:</span> <span className="capitalize">{prediction.gama_label}</span></p>
                            <p><span className="font-semibold">Índice de precio/rendimiento:</span> {prediction.predicted_priceperformance.toFixed(2)}</p>
                            <p>
                                <span className="font-semibold">¿Vale la pena por su precio?</span>{' '}
                                <span className={prediction.priceperformance_label === 'yes' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {prediction.priceperformance_label === 'yes' ? 'Sí' : 'No'}
                    </span>
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full text-center mt-10 text-gray-500">Cargando detalles de la laptop...</div>
            )}

        </BeginContainerStyle>
    );
};

export default ProductsView;
