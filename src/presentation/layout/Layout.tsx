
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const Layout = () => {

    return (
        <div className="flex flex-col">
            <Navbar />

            <main className="flex-1 min-h-screen">

                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
