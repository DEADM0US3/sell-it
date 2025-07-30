// src/components/CardDetail.tsx
import React, {useEffect, useState} from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LaptopDto } from '../../contracts/laptop/laptopDto.ts';
import LaptopPlaceholder from '../../assets/img/laptop-placeholder.png';
import Compu from "../../assets/img/Compu.png";
import {imageServerApi} from "../../infrastructure/http/features/imageServerApi.ts";
interface CardDetailProps {
    product: LaptopDto;
}

/**
 * CardDetail
 * Componente de detalle de producto con UI profesional y UX sobresaliente.
 */
export const CardDetail: React.FC<CardDetailProps> = ({product}) => {
    const [quantity, setQuantity] = useState(1);

    const [imageUrl, setImageUrl] = useState<string>(Compu);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await imageServerApi.getImageUrl(product.image_url);
            if (url) setImageUrl(url);
        };

        fetchImage();
    }, [product?.image_url]);


    const handleAddToCart = () => {
        const currentCart: Array<LaptopDto & { quantity: number }> =
            JSON.parse(localStorage.getItem('cart') || '[]');

        const existing = currentCart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            currentCart.push({...product, quantity});
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Imagen */}
            <div className="bg-gray-50 p-6 flex items-center justify-center">
                <img
                    src={imageUrl || LaptopPlaceholder}
                    alt={product.title}
                    className="object-contain w-full h-80"
                />
            </div>

            {/* Detalles */}
            <div className="p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-semibold mt-1">{product.title}</h1>
                    <h2 className="text-2xl font-bold text-[#14479D] my-3">
                        ${product.price.toLocaleString('es-MX')} MXN
                    </h2>
                    <p>{product.description}</p>
                </div>

                {/* Cantidad y acciones */}
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Cantidad
                        </label>
                        <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={decrement}
                                className="p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <Minus size={16}/>
                            </button>
                            <span className="px-4 text-lg font-medium text-gray-900">
                {quantity}
              </span>
                            <button
                                onClick={increment}
                                className="p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <Plus size={16}/>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 px-6 py-3 bg-[#14489D] text-white font-semibold rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
