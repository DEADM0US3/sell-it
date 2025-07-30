import {Link, useNavigate} from "react-router-dom";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import {userServerApi} from "../../../infrastructure/http/features/userServerApi.ts";
import {useEffect, useState} from "react";
import LoadingScreen from "../../components/LoadingScreen.tsx";
import ShoppingCart from "../../../shared/components/ShoppingCart.tsx";


export const Navbar = () => {
    const navigate = useNavigate();

    // Estados de auth y rol
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);


    // Datos de perfil y carrito
    const [user, setUser] = useState<{ name: string; avatarUrl: string }>();
    const [cartCount, setCartCount] = useState(0);

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

    // Verificar rol
    useEffect(() => {
        (async () => {
            try {
                const role = await userServerApi.getRole();
                setIsSeller(role === "seller");
            } catch {
                setIsSeller(false);
            }
        })();
    }, []);

    // Cargar perfil y carrito desde localStorage
    useEffect(() => {
        if (!isAuth) {
            setCartCount(0);
            return;
        }

        // Perfil
        (async () => {
            try {
                const profile = await userServerApi.getProfile();
                setUser({
                    name: profile?.full_name ?? "Rodrigo",
                    avatarUrl: profile?.avatar_url ?? "/placeholder-avatar.png",
                });
            } catch {
                // deja valores por defecto
            }
        })();

        // Carrito desde localStorage
        try {
            const items = JSON.parse(localStorage.getItem("cart") ?? "[]");
            setCartCount(Array.isArray(items) ? items.length : 0);
        } catch {
            setCartCount(0);
        }
    }, [isAuth]);

    const handleLogout = async () => {
        await authServerApi.logout();
        navigate("/login");
    };

    if (!user) return <LoadingScreen />

    return (
        <><nav className="bg-[#15489C] shadow-md px-6 py-4 flex justify-end items-center montserrat">

            <div className="flex items-center space-x-6">
                <Link to="/" className=" text-white hover:text-gray-200 transition-colors montserrat ">
                    🏠 Inicio
                </Link>
                <Link
                    to="/products"
                    className="text-white hover:text-blue-200 font-medium transition-colors montserrat"
                >
                    💻
                    Laptops
                </Link>

                {
                    isSeller ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-blue-200 font-medium transition-colors montserrat "
                            >
                                📦 Mis productos
                            </Link>
                        </>
                    ) : null
                }

                <button
                    onClick={() => setCartOpen(true)}
                    className="flex relative items-center text-sm space-x-2 text-white hover:text-blue-200 font-medium transition-colors">
                    🛒
                    Carrito
                    {cartCount > 0 && (
                        <span
                            className="absolute -top-1 -right-5 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                          </span>
                    )}
                </button>

                {
                    isAuth ? (
                        <div
                            onClick={handleLogout}
                            className="bg-[#648ACB] ml-5 text-white font-semibold px-4 py-2 montserrat  hover:bg-blue-500 transition-colors rounded-3xl "
                        >
                            Cerrar Sesión
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#648ACB] text-white font-semibold px-4 py-2 montserrat hover:bg-blue-500 transition-colors rounded-3xl"
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

            <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)}/>

        </>

    );
};