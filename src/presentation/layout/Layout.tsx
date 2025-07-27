import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authServerApi } from "../../infrastructure/http/features/authServerApi.ts";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const Layout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const userId = await authServerApi.getUserId();
            if (!userId) {
                // No está autenticado → lo mando al login
                navigate("/login", { replace: true });
            } else {
                // Ya validé y todo OK
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    // Mientras comprobamos la sesión, no renderizamos nada (o mostrar un spinner)
    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6">
                {/* Aquí van las rutas hijas */}
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
