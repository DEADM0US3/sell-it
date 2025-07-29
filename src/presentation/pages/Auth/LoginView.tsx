import logo from "../../../assets/img/logo.png"
import laptop from "../../../assets/img/laptop.png"
import Logo_transparente from '../../../assets/img/Logo_transparente.png';

const LoginView = () => {



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center px-10 lg:px-20">
                <div className="">
                    <img src={Logo_transparente} alt="Logo" className=" mb-8 object-cover object-center" />
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Inicia sesión y relájate. <br/>
                    Pronto tendrás un nuevo equipo

                </h1>

                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-700 font-medium"
                        >
                            Correo
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@sellIT.com"
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-700 font-medium"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="******************"
                            className="w-full border border-gray-500 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#1E3865] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#172c50] transition"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            type="button"
                            className="border-2 bg-white border-[#1E3865] text-[#1E3865] px-6 py-2 rounded-md hover:bg-[#f0f4ff] transition"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>

            <div className="hidden md:flex items-center justify-center bg-[#C4D7FF] p-10">
                <img
                    src={laptop}
                    alt="Laptop"
                    className="max-w-md"
                />
            </div>
        </div>
    );
};

export default LoginView;
