import { useState } from "react";
import { useNavigate } from "react-router-dom";
import laptop from "../../../assets/img/laptop.png";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import Logo_transparente from '../../../assets/img/Logo_transparente.png';
import Login_borde from '../../../assets/img/Login_borde.png';
import { toast } from "sonner";

const LoginView = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authServerApi.login(email, password);
            if (response) {
                toast.success('Bienvenido');
                navigate("/dashboard");
            } else {
                return toast.error('Las credenciales no son correctas');
            }
        } catch (error) {
            console.log(error)
            toast.error('Algo ha salido mal')
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Lado izquierdo: formulario */}
            <div className="flex flex-col justify-center px-10 lg:px-20">
                <div className="">
                    <img src={Logo_transparente} alt="Logo" className=" mb-8 object-cover object-center" />
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Inicia sesión y relájate. <br />
                    Pronto tendrás un nuevo equipo.
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
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


                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#1E3865] text-white px-6 py-2 rounded-md shadow-md transition hover:bg-[#172c50] transition"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="border-2 bg-white border-[#1E3865] text-[#1E3865] px-6 py-2 rounded-md transition hover:bg-[#f0f4ff] transition"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>

            {/* Lado derecho: imagen */}
            <div className="hidden md:flex items-center justify-center relative rounded-bl-full h-[50vh]">
                <img
                    src={Login_borde}
                    alt="Decoración"
                    className="w-full h-auto"
                />

                <img
                    src={laptop}
                    alt="Laptop"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2  pt-[50vh] -translate-y-1/2 max-w-md z-10"
                />
                </div>


        </div>
    );
};

export default LoginView;
