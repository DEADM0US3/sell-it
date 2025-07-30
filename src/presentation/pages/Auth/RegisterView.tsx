import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PC from "../../../assets/img/PC.png";
import logo from "../../../assets/img/logo.png";
import { authServerApi } from "../../../infrastructure/http/features/authServerApi.ts";
import { Box, Button } from "@mui/material";
import { toast } from 'sonner'; 

const RegisterView = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"buyer" | "seller">("buyer");

    const steps = ["Selecciona tu rol", "Completa tus datos"];

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await authServerApi.register(name, email, password, role);

        if (response) {
            toast.success('Bienvenido a Sell IT')
            navigate("/dashboard");
        } else {
            toast.error('Hubo un error al registrar al usuario')
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
                    <img src={logo} alt="Logo" className="mb-8 object-cover object-center w-40"/>
                </div>

                <h1 className="text-2xl font-bold md:text-end text-[#1E3865] mb-4">
                    Regístrate y explora nuestro <br/>
                    catálogo. Encontrarás algo para ti.
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Box sx={{width: '100%', mb: 4}}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {activeStep === 0 && (
                        <div>
                            <label htmlFor="role" className="block text-sm text-gray-700 font-medium mb-2">
                                Selecciona el rol que te gustaría tener en Sell IT
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as "buyer" | "seller")}
                                className="w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="buyer">Comprador</option>
                                <option value="seller">Vendedor</option>
                            </select>

                            <div className="flex justify-end mt-6">
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Siguiente
                                </Button>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="border-2 border-[#1E3865] absolute bottom-10 right-10 text-[#1E3865] px-6 py-2 rounded-md hover:bg-[#f0f4ff] transition"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                        
                    )}

                    {activeStep === 1 && (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-2">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Ej. Juan Pérez"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-700 font-medium mb-2">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="correo@sellIT.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm text-gray-700 font-medium mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="******************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <Button variant="outlined" color="primary" onClick={handleBack}>
                                    Atrás
                                </Button>
                                <Button variant="contained" color="primary" type="submit">
                                    Registrar
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterView;
