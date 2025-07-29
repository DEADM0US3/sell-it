import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authServerApi } from "../../infrastructure/http/features/authServerApi.ts";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const Layout = () => {

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
