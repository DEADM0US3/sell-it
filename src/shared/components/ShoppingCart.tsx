import React, {useEffect, useState} from "react";
import {X, Trash2, Minus, Plus} from "lucide-react";
import {Link} from "react-router-dom";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({isOpen, onClose}) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (!isOpen) return;
        try {
            const stored = JSON.parse(localStorage.getItem("cart") || "[]");
            setItems(Array.isArray(stored) ? stored : []);
        } catch {
            setItems([]);
        }
    }, [isOpen]);

    const updateStorage = (newItems: CartItem[]) => {
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
    };

    const handleQuantityChange = (id: string, delta: number) => {
        const updated = items.map(item =>
            item.id === id
                ? {...item, quantity: Math.max(1, item.quantity + delta)}
                : item
        );
        updateStorage(updated);
    };

    const handleRemove = (id: string) => {
        updateStorage(items.filter(item => item.id !== id));
    };

    const handleClear = () => {
        updateStorage([]);
    };

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/[.4] backdrop-blur-[1px] z-40"
                onClick={onClose}
            />

            <aside
                className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col overflow-hidden animate-slide-in">
                <header className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-900">Tu carrito</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24}/>
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto divide-y">
                    {items.length === 0 ? (
                        <div className="flex items-center justify-center h-full p-8">
                            <p className="text-gray-500">El carrito está vacío.</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex p-6 items-center space-x-4">
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg border"
                                    />
                                )}
                                <div className="flex-1">
                                    <Link to={`/product/${item.id}`}
                                          className="block text-lg font-medium text-gray-900 hover:underline">
                                        {item.name}
                                    </Link>
                                    <p className="mt-1 text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="mt-3 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="p-1 border rounded-md text-gray-600 hover:bg-gray-100"
                                        >
                                            <Minus size={16}/>
                                        </button>
                                        <span
                                            className="px-3 py-1 bg-gray-100 rounded-md text-gray-800">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, +1)}
                                            className="p-1 border rounded-md text-gray-600 hover:bg-gray-100"
                                        >
                                            <Plus size={16}/>
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="ml-auto text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <footer className="p-6 border-t bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-900">Total:</span>
                            <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleClear}
                                className="flex-1 py-3 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition"
                            >
                                Vaciar carrito
                            </button>
                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="flex-1 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition text-center"
                            >
                                Continuar al pago
                            </Link>
                        </div>
                    </footer>
                )}
            </aside>

            {/* Animación CSS */}
            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                .animate-slide-in {
                    animation: slide-in 300ms ease-out;
                }
            `}</style>
        </>
    );
};

export default ShoppingCart;
