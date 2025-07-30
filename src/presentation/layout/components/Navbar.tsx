import {Link, useNavigate} from "react-router-dom";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import {useEffect, useState} from "react";

export const Navbar = () => {

    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

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
        <nav className="bg-blue-700 shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
                Sell IT
            </Link>
            <div className="flex items-center space-x-6">
                <Link
                    to="/products"
                    className="text-white hover:text-blue-200 font-medium transition-colors"
                >
                    Productos
                </Link>
                <Link
                    to="/cart"
                    className="text-white hover:text-blue-200 font-medium transition-colors"
                >
                    Carrito
                </Link>

                {
                    isAuth ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-blue-200 font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : null
                }


                {
                    isAuth? (
                        <div
                            onClick={async () => {
                                await authServerApi.logout()
                                navigate("/login");
                            }}
                            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            Logout
                        </div>
                    ): (
                        <Link
                            to="/login"
                            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            Iniciar sesión
                        </Link>
                    )
                }

            </div>
        </nav>
    );
};
