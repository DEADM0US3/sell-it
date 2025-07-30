// src/views/ProductsView.tsx
import React, { useEffect, useState } from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import { useParams } from "react-router-dom";
import { laptopsServerApi } from "../../../infrastructure/http/features/laptopsServerApi.ts";
import { aiPredictionsServerApi } from "../../../infrastructure/http/features/ai-predictionsServerApi.ts";
import type { LaptopDto } from "../../../contracts/laptop/laptopDto.ts";
import type { AiPredictionDto } from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import { CardDetail } from "../../components/CardDetails.tsx";

const ProductsView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
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
            <section className="flex flex-col md:flex-row gap-8 px-6 mt-20 md:px-40 py-10 border-b border-gray-200">
                <CardDetail product={product} />
            </section>

            {/* === Bloque 2: Especificaciones técnicas === */}
            <section className="max-w-5xl mx-auto py-10 mt-10 px-6 space-y-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-[#14479D]">Especificaciones técnicas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                    <div><span className="font-medium">Marca:</span> {product.brand}</div>
                    <div><span className="font-medium">Modelo:</span> {product.model}</div>
                    <div><span className="font-medium">Procesador:</span> {product.cpu}</div>
                    <div><span className="font-medium">Tarjeta gráfica:</span> {product.gpu}</div>
                    <div><span className="font-medium">RAM:</span> {product.ram_gb} GB</div>
                    <div><span className="font-medium">Almacenamiento:</span> {product.storage_gb} GB ({product.storage_type})</div>
                    <div><span className="font-medium">Pantalla:</span> {product.screen_size}" {product.touch_support ? 'Táctil' : 'No táctil'}</div>
                    <div><span className="font-medium">Batería:</span> {product.battery_life_hours} h</div>
                    <div><span className="font-medium">Condición:</span> {product.condition}</div>
                </div>
            </section>

            {/* === Bloque 3: Descripción === */}
            <section className="max-w-5xl mx-auto py-10 px-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-[#14479D]">Descripción</h2>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">{product.description}</p>
            </section>
            
            {/* === Bloque 4: Predicción IA === */}
            {prediction && (
                <section className="max-w-5xl mx-auto py-10 px-6 border-b border-gray-200 bg-[#F4F9FF] rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-[#14479D] mb-6">Predicción de IA</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                        <div>
                            <span className="font-medium">Gama estimada:</span>{' '}
                            <span className="capitalize">{prediction.gama_label}</span>
                        </div>
                        <div>
                            <span className="font-medium">Índice precio/rendimiento:</span>{' '}
                            {prediction.predicted_priceperformance.toFixed(2)}
                        </div>
                        <div>
                            <span className="font-medium">¿Vale la pena?:</span>{' '}
                            <span className={
                                prediction.priceperformance_label === 'yes'
                                    ? 'text-green-600 font-semibold'
                                    : 'text-red-600 font-semibold'
                            }>
                                {prediction.priceperformance_label === 'yes' ? 'Sí' : 'No'}
                            </span>
                        </div>
                    </div>
                </section>
            )}

            <section className="max-w-5xl mx-auto py-8 px-6 text-sm text-gray-500">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div><span className="font-medium">Creado:</span> {new Date(product.created_at).toLocaleDateString()}</div>
                    <div><span className="font-medium">Actualizado:</span> {new Date(product.updated_at).toLocaleDateString()}</div>
                </div>
            </section>
        </BeginContainerStyle>
    );
};

export default ProductsView;
