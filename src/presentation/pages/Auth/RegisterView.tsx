import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PC from "../../../assets/img/PC.png";
import logo from "../../../assets/img/logo.png";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import { profileServerApi } from "../../../infrastructure/http/features/profileServerApi.ts";
import type { ProfileCreateDto } from "../../../contracts/profile/profileCreateDto.ts";

const RegisterView = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"buyer" | "seller">("buyer");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await authServerApi.register(name, email, password, role);

        if (response) {
            navigate("/dashboard");
        } else {
            console.error("Error al registrar el usuario");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Imagen a la izquierda */}
            <div className="hidden md:flex items-center justify-center bg-[#C4D7FF] p-10">
                <img src={PC} alt="Laptop" className="max-w-md" />
            </div>

            {/* Formulario a la derecha */}
            <div className="flex flex-col justify-center px-10 lg:px-20">
                <div className="flex md:justify-end">
                    <img src={logo} alt="Logo" className="mb-8 object-cover object-center w-40" />
                </div>

                <h1 className="text-2xl font-bold md:text-end text-[#1E3865] mb-4">
                    Regístrate y explora nuestro <br />
                    catálogo. Encontrarás algo para ti.
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-700 font-medium">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ej. Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
                            Correo
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@sellIT.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm text-gray-700 font-medium">
                            Selecciona tu rol
                        </label>
                        <select
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as "buyer" | "seller")}
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="buyer">Comprador</option>
                            <option value="seller">Vendedor</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#1E3865] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#172c50] transition"
                        >
                            Registrar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="border-2 border-[#1E3865] text-[#1E3865] px-6 py-2 rounded-md hover:bg-[#f0f4ff] transition"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterView;
