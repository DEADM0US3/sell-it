import {Link, useNavigate} from "react-router-dom";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import {userServerApi} from "../../../infrastructure/http/features/userServerApi.ts";
import {useEffect, useState} from "react";
import ShoppingCart from "../../../shared/components/ShoppingCart.tsx";
import LoadingScreen from "../../components/LoadingScreen.tsx";

export const Navbar = () => {
    const navigate = useNavigate();

    // Estados de auth y rol
    const [isAuth, setIsAuth] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);


    // Datos de perfil y carrito
    const [user, setUser] = useState<{ name: string; avatarUrl: string }>();
    const [cartCount, setCartCount] = useState(0);

    // Controles UI
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Verificar sesión
    useEffect(() => {
        (async () => {
            try {
                const userId = await authServerApi.getUserId();
                setIsAuth(!!userId);
            } catch {
                setIsAuth(false);
            }
        })();
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
        <>
            <nav className="bg-[#2563eb] ">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
                    >
                        Sell IT
                    </Link>

                    {/* Hamburger (móvil) */}
                    <button
                        className="sm:hidden text-white focus:outline-none"
                        aria-label="Toggle menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 8h16M4 16h16"/>
                            </svg>
                        )}
                    </button>

                    {/* Menú principal */}
                    <div className="hidden sm:flex items-center text-sm space-x-6">
                        <Link to="/products"
                              className="text-white flex items-center space-x-2 hover:text-blue-200 font-medium transition-colors">
                            💻
                            Laptops
                        </Link>


                        {isSeller && (
                            <Link to="/dashboard"
                                  className="text-white space-x-2 items-center flex hover:text-blue-200 font-medium transition-colors">
                                📦 Mis productos
                            </Link>
                        )}

                        <button
                            onClick={() => setCartOpen(true)}
                            className="flex items-center text-sm space-x-2 text-white hover:text-blue-200 font-medium transition-colors">
                             🛒
                                Carrito
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                          </span>
                            )}
                        </button>

                        {isAuth ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={user.avatarUrl || "/placeholder-avatar.png"}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-white font-medium">{user.name || "Usuario"}</span>
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Perfil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login"
                                  className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)}/>
        </>
    );
};