import PC from "../../../assets/img/PC.png"
import logo from "../../../assets/img/logo.png"

const RegisterView = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                <div className="hidden md:flex items-center justify-center bg-[#C4D7FF] p-10">
                    <img
                        src={PC}
                        alt="Laptop"
                        className="max-w-md"
                    />
                </div>
                <div className="flex flex-col justify-center px-10 lg:px-20">
                    <div className="flex md:justify-end">
                        <img src={logo} alt="Logo" className=" mb-8 object-cover object-center" />
                    </div>

                    <h1 className="text-2xl font-bold md:text-end text-[#1E3865] mb-2">
                        Registrate y explora nuestro <br/>
                        catalogo, encontraras algo para ti
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
                                className="border-2 border-[#1E3865] text-[#1E3865] px-6 py-2 rounded-md hover:bg-[#f0f4ff] transition"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default RegisterView;