import React, { useState } from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import Laptop from '../../../assets/Laptop.png';

const CartView: React.FC = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Laptop Gamer ASUS",
            price: 200000,
            image: Laptop
        },
        {
            id: 2,
            name: "Laptop HP Pavilion",
            price: 180000,
            image: Laptop
        }
    ]);

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
            <BeginContainerStyle>
                <div className="flex items-center gap-40 justify-center py-5">
                    <img src={Laptop} alt="Cart Icon"/>
                    <h1 className="text-6xl text-white font-semibold">
                        CARRITO
                    </h1>
                </div>

            </BeginContainerStyle>


            <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-5xl mb-28">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover"/>
                                        <div>
                                            <p className="font-semibold text-lg">{item.name}</p>
                                            <p className="text-gray-600">${item.price.toLocaleString()} MXN</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="text-right mt-6">
                            <p className="text-xl font-bold">
                                Total: ${total.toLocaleString()} MXN
                            </p>
                            <button className="mt-4 px-6 py-2 text-white bg-[#14489D] hover:bg-blue-700">
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartView;
