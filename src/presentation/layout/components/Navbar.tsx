import { Link, useNavigate } from "react-router-dom";
import { authServerApi } from "../../../infrastructure/http/features/authServerApi.ts";
import { useEffect, useState } from "react";
import { userServerApi } from "../../../infrastructure/http/features/userServerApi.ts";

export const Navbar = () => {

    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userId = await userServerApi.getRole();
                setIsSeller(userId === "seller");
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsSeller(false);
            }
        };

        checkAuth();

    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userId = await authServerApi.getUserId();
                setIsAuth(!!userId);
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuth(false);
            }
        };

        checkAuth();

    }, []);

    return (
        <><nav className="bg-[#15489C] shadow-md px-6 py-4 flex justify-end items-center montserrat">

            <div className="flex items-center space-x-6">
                <Link to="/" className=" text-white hover:text-gray-200 transition-colors montserrat hover:font-bold">
                    Inicio
                </Link>
                <Link
                    to="/products"
                    className="text-white hover:text-blue-200 font-medium transition-colors montserrat hover:font-bold"
                >
                    Productos
                </Link>
                <Link
                    to="/cart"
                    className="text-white hover:text-blue-200 font-medium transition-colors montserrat hover:font-bold"
                >
                    Carrito
                </Link>

                {
                    isSeller ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-blue-200 font-medium transition-colors montserrat hover:font-bold"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : null
                }


                {
                    isAuth ? (
                        <div
                            onClick={async () => {
                                await authServerApi.logout()
                                navigate("/login");
                            }}
                            className="bg-[#648ACB] text-white font-semibold px-4 py-2 montserrat  hover:bg-blue-500 transition-colors rounded-3xl hover:font-bold"
                        >
                            Logout
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#648ACB] text-white font-semibold px-4 py-2 montserrat hover:bg-blue-500 transition-colors rounded-3xl hover:font-bold"
                        >
                            Mi cuenta
                        </Link>
                    )
                }

            </div>
        </nav>
            <div className="bg-white overflow-hidden border-t border-gray-200">
                <div className="bg-white overflow-hidden border-t border-gray-200">
                    <div className="whitespace-nowrap">
                        <div
                            className="inline-block animate-marquee"
                            style={{
                                animation: 'marquee 30s linear infinite',
                                display: 'inline-block',
                            }}
                        >
                            <span className="text-[#648ACB] montserrat font-medium mx-8">
                                Compra mínima de $12500 MXN | Envíos a todo México |
                            </span>
                            <span className="text-[#648ACB] montserrat font-medium mx-8">
                                Compra mínima de $12500 MXN | Envíos a todo México |
                            </span>
                            <span className="text-[#648ACB] montserrat font-medium mx-8">
                                Compra mínima de $12500 MXN | Envíos a todo México |
                            </span>
                            <span className="text-[#648ACB] montserrat font-medium mx-8">
                                ¡Conviértete en distribuidor!
                            </span>
                        </div>
                    </div>

                    <style>{`
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `}</style>
                </div>

            </div>


        </>


    );
};
