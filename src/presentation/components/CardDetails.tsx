import React, { useState } from 'react';
import LaptopDell from '../../assets/img/Laptop_dell.png';
import { Plus, Minus } from 'lucide-react';

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
}

interface CardDetailProps {
    product: Product;
}

/**
 * CardDetail
 * Componente de detalle de producto con una UI profesional y UX sobresaliente.
 * Responsive, limpio y enfocado en conversión.
 */
export const CardDetail: React.FC<CardDetailProps> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        // Leer carrito actual
        const currentCart: Array<Product & { quantity: number }> =
            JSON.parse(localStorage.getItem('cart') || '[]');

        // Buscar si el producto ya existe
        const existingItem = currentCart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentCart.push({ ...product, quantity });
        }

        // Guardar y emitir evento para actualizar navbar
        localStorage.setItem('cart', JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-3xl shadow-lg">
            {/* Imagen del producto */}
            <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-6">
                <img
                    src={product?.imageUrl || LaptopDell}
                    alt={product?.name ?? ""}
                    className="object-contain w-full h-full rounded-lg"
                />
            </div>

            {/* Detalles y acciones */}
            <div className="flex flex-col justify-between p-4 text-gray-900">
                <div>
                    <h1 className="text-3xl font-bold mb-2 hover:text-blue-600 transition">
                        {product?.name ?? ""}
                    </h1>
                    <p className="text-2xl font-semibold text-gray-800 mb-6">
                        ${product?.price.toLocaleString('es-MX')} MXN
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Control de cantidad */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Cantidad
                        </label>
                        <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={decrement}
                                className="p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Disminuir cantidad"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4 text-lg font-medium text-gray-900">{quantity}</span>
                            <button
                                type="button"
                                onClick={increment}
                                className="p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Aumentar cantidad"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            Agregar al carrito
                        </button>
                        <button
                            onClick={handleAddToCart /* Redirigir a checkout si es necesario */}
                            className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};