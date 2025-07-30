// src/views/ProductsView.tsx
import React, {useEffect, useState} from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import {useParams} from "react-router-dom";
import {laptopsServerApi} from "../../../infrastructure/http/features/laptopsServerApi.ts";
import {aiPredictionsServerApi} from "../../../infrastructure/http/features/ai-predictionsServerApi.ts";
import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
import type {AiPredictionDto} from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import {CardDetail} from "../../components/CardDetails.tsx";
import {ProductSpecs} from "./components/TechnicalStats.tsx";
import {Laptop} from "lucide-react";
import {ProductConditionAlert} from "./components/ProductCondition.tsx";
import IAPrediction from "./components/IAPrediction.tsx";

const ProductsView: React.FC = () => {
        const {id} = useParams<{ id: string }>();
        const [product, setProduct] = useState<LaptopDto | null>(null);
        const [prediction, setPrediction] = useState<AiPredictionDto | null>(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            (async () => {
                if (!id) return;
                setLoading(true);
                try {
                    const data = await laptopsServerApi.getById(id);
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [id]);

        useEffect(() => {
            (async () => {
                if (!id) return;
                try {
                    const pred = await aiPredictionsServerApi.getByLaptopId(id);
                    setPrediction(pred);
                    console.log(pred);
                } catch (error) {
                    console.error("Error fetching prediction data:", error);
                }
            })();
        }, [id]);

        if (loading) {
            return (
                <BeginContainerStyle>
                    <div className="text-center py-20 text-gray-500">Cargando producto...</div>
                </BeginContainerStyle>
            );
        }

        if (!product) {
            return (
                <BeginContainerStyle>
                    <div className="text-center py-20 text-red-500">Producto no encontrado.</div>
                </BeginContainerStyle>
            );
        }

        return (
            <BeginContainerStyle>
                {/* === Bloque 1: Detalle principal === */}
                <section className="flex flex-col md:flex-row gap-8 px-6 mt-20 md:px-40 py-10 ">
                    <CardDetail product={product}/>
                </section>


                {/* === Bloque 2: Especificaciones técnicas === */}
                <section className="max-w-5xl mx-auto bg-white pb-10 rounded-t-lg my-5  shadow-lg">
                    <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg px-6 py-4 flex items-center space-x-3">
                        <Laptop className="w-8 h-8"/>
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Especificaciones técnicas</h2>
                    </div>
                    <div className="px-6 flex flex-col gap-4">
                        <ProductConditionAlert product={product}/>
                        <ProductSpecs product={product}/>
                    </div>
                </section>

                {prediction && (
                    <section
                        className="max-w-5xl mx-auto rounded-xl shadow-sm">
                        <IAPrediction
                            product={product}
                            prediction={prediction}/>
                    </section>
                )
                }


                {/* === Bloque 4: Predicción IA === */}


                <section className="max-w-5xl mx-auto py-8 px-6 text-sm text-gray-500">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div><span
                            className="font-medium">Creado:</span> {new Date(product.created_at).toLocaleDateString()}</div>
                        <div><span
                            className="font-medium">Actualizado:</span> {new Date(product.updated_at).toLocaleDateString()}
                        </div>
                    </div>
                </section>
            </BeginContainerStyle>
        )
            ;
    }
;

export default ProductsView;
