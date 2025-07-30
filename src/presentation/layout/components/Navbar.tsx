import { Link, useNavigate } from "react-router-dom";
import { authServerApi } from "../../../infrastructure/http/features/authServerApi.ts";
import { userServerApi } from "../../../infrastructure/http/features/userServerApi.ts";
import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen.tsx";
import ShoppingCart from "../../../shared/components/ShoppingCart.tsx";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth]     = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser]         = useState<{ name: string; avatarUrl: string }>();
    const [cartCount, setCartCount] = useState(0);

    // Chequeos de auth y perfil…
    useEffect(() => {
        (async () => {
            const userId = await authServerApi.getUserId().catch(() => null);
            setIsAuth(!!userId);
        })();
    }, []);

    useEffect(() => {
        if (!isAuth) return setCartCount(0);
        (async () => {
            const profile = await userServerApi.getProfile().catch(() => null);
            if (profile) {
                setUser({
                    name: profile?.full_name || "Usuario",
                    avatarUrl: profile.avatar_url || "https://via.placeholder.com/150",
                });
            }
        })();
    }, [isAuth]);

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

    const updateCartCount = useCallback(() => {
        try {
            const items = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(Array.isArray(items) ? items.length : 0);
        } catch {
            setCartCount(0);
        }
    }, []);

    useEffect(() => {
        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);
        window.addEventListener("storage", updateCartCount);
        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
            window.removeEventListener("storage", updateCartCount);
        };
    }, [updateCartCount]);

    const handleLogout = async () => {
        await authServerApi.logout();
        navigate("/login");
    };

    if (!user && isAuth) return <LoadingScreen />;

    return (
        <>
            <nav className="bg-[#15489C] shadow-md px-4 md:px-10 py-4 flex items-center justify-between montserrat">
                {/* Logo o avatar en desktop */}
                {user && (
                    <div className="hidden md:flex items-center space-x-2">
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-white font-semibold">{user.name}</span>
                    </div>
                )}

                {/* Botón hamburguesa mobile */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Menú Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-white hover:text-gray-200 transition">
                         <FontAwesomeIcon  className="px-[1vw]"  icon={faHome} /> Inicio
                    </Link>
                    <Link to="/products" className="text-white hover:text-blue-200 font-medium transition">
                         <FontAwesomeIcon  className="px-[1vw]"  icon={faLaptop} /> Laptops
                    </Link>
                    {isSeller && (
                        <Link to="/dashboard" className="text-white hover:text-blue-200 font-medium transition">
                             <FontAwesomeIcon className="px-[1vw]" icon={faBox} />  Mis productos
                        </Link>
                    )}
                    <button
                        onClick={() => setCartOpen(true)}
                        className="relative flex items-center text-white hover:text-blue-200 font-medium transition"
                    >
                        <FontAwesomeIcon  className="px-[1vw]"  icon={faShoppingCart} /> Carrito
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-4 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
                        )}
                    </button>
                    {isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="bg-[#648ACB] text-white font-semibold px-4 py-2 hover:bg-blue-500 transition rounded-3xl"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#648ACB] text-white font-semibold px-4 py-2 hover:bg-blue-500 transition rounded-3xl"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </nav>

            {/* Overlay Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-40">
                    <div className="bg-white w-64 h-full p-6 z-50">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-800 font-medium"
                            >
                                🏠 Inicio
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-800 font-medium"
                            >
                                💻 Laptops
                            </Link>
                            {isSeller && (
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-800 font-medium"
                                >
                                    📦 Mis productos
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    setCartOpen(true);
                                    setMenuOpen(false);
                                }}
                                className="flex items-center text-gray-800 font-medium"
                            >
                                🛒 Carrito
                                {cartCount > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                                )}
                            </button>
                            {isAuth ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="bg-[#648ACB] text-white font-semibold py-2 rounded-3xl"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-[#648ACB] text-white font-semibold py-2 rounded-3xl text-center"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            {/* Ticker y carrito */}
            <div className="bg-white border-t border-gray-200">
                <div className="whitespace-nowrap overflow-hidden">
                    <div
                        className="inline-block animate-marquee"
                        style={{ animation: "marquee 30s linear infinite" }}
                    >
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

            <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};
