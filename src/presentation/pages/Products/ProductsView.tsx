// src/views/ProductsView.tsx
import React, { useEffect, useState } from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import { useParams } from "react-router-dom";
import { laptopsServerApi } from "../../../infrastructure/http/features/laptopsServerApi.ts";
import type { LaptopDto } from "../../../contracts/laptop/laptopDto.ts";
import {CardDetail} from "../../components/CardDetails.tsx";

const ProductsView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<LaptopDto | null>(null);
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
            {/* Card principal */}
            <div className="flex flex-col md:flex-row gap-8 px-6 md:px-40 py-8">
                <CardDetail product={product} />
            </div>

            {/* Especificaciones y descripción */}
            <div className="max-w-3xl mx-auto my-12 text-gray-900 space-y-6">
                <h2 className="text-2xl font-semibold">
                    Especificaciones
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Brand:</span> {product.brand}</div>
                    <div><span className="font-medium">Model:</span> {product.model}</div>
                    <div><span className="font-medium">CPU:</span> {product.cpu}</div>
                    <div><span className="font-medium">GPU:</span> {product.gpu}</div>
                    <div><span className="font-medium">RAM:</span> {product.ram_gb} GB</div>
                    <div><span className="font-medium">Storage:</span> {product.storage_gb} GB ({product.storage_type})</div>
                    <div><span className="font-medium">Screen:</span> {product.screen_size}" {product.touch_support ? 'Táctil' : 'No táctil'}</div>
                    <div><span className="font-medium">Battery life:</span> {product.battery_life_hours} h</div>
                    <div><span className="font-medium">Condition:</span> {product.condition}</div>
                    <div><span className="font-medium">Creado:</span> {new Date(product.created_at).toLocaleDateString()}</div>
                    <div><span className="font-medium">Actualizado:</span> {new Date(product.updated_at).toLocaleDateString()}</div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Descripción</h2>
                    <p className="mt-2 text-gray-700">{product.description}</p>
                </div>
            </div>
        </BeginContainerStyle>
    );
};

export default ProductsView;
