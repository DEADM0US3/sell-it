import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-blue-700 shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">
                MiTienda
            </Link>
            <div className="space-x-6 text-white">
                <Link to="/products" className="hover:text-blue-500">Productos</Link>
                <Link to="/about" className="hover:text-blue-500">Nosotros</Link>
                <Link to="/cart" className="hover:text-blue-500">Carrito</Link>
            </div>
        </nav>
    );
};
