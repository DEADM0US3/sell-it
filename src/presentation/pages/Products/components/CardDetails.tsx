import Laptop_dell from '../../../../assets/img/Laptop_dell.png';
import type {LaptopDto} from "../../../../contracts/laptop/laptopDto.ts";

interface CardDetailProps {
    laptop?: LaptopDto | null;
}

export const CardDetail = ({ laptop }: CardDetailProps) => {
    return (
        <div>
            <div className="flex rounded-xl w-[80vw] py-[5vh] max-w-5xl h-[55vh] mx-auto">

                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl flex items-center justify-center w-[30vw]">
                    <img
                        src={Laptop_dell} // Podrías mapear la imagen desde laptop?.imageUrl si lo tienes
                        alt={laptop?.title || "Laptop"}
                        className="w-[80%] h-auto object-contain"
                    />
                </div>

                <div className="text-white px-[5vw] w-[30vw] flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-snug">
                            {laptop?.brand ?? 'Marca desconocida'} <br />
                            {laptop?.title ?? 'Nombre del producto'}
                        </h2>
                        <p className="text-lg font-semibold mt-4">
                            ${laptop?.price?.toLocaleString('es-MX') ?? '0'} MXN
                        </p>
                    </div>

                    <div className="mt-6">
                        <label className="block mb-1 text-sm font-medium">Cantidad</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-[5rem] h-[10vh] p-2 rounded-md text-white border border-gray-300"
                            />
                            <div className='flex flex-col'>
                                <div>
                                    <button
                                        className="bg-white border-slate-300 border text-[#21519F] px-4 py-2 rounded-full w-[27vw] font-semibold hover:bg-gray-100 transition">
                                        Agregar al carrito
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="border border-slate-300 mt-4 text-white px-4 py-2 rounded-full w-[27vw] font-semibold hover:bg-white hover:text-[#14489D] transition">
                                        Comprar ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
