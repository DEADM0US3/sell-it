import React from 'react';
import Borde_home from '../../../assets/img/Borde_home.png';
import { CardsProduct } from "../../components/CardProduct.tsx";
import { laptopsServerApi } from "../../../infrastructure/http/features/laptopsServerApi.ts";
import type { LaptopDto } from "../../../contracts/laptop/laptopDto.ts";
import { aiPredictionsServerApi } from '../../../infrastructure/http/features/ai-predictionsServerApi.ts';
import Logo_transparente from '../../../assets/img/logo_01.png';
import Laptop_home from '../../../assets/img/36ce44f3-5765-40b3-b2c2-6f6179579726.png'
import { useState } from 'react';
import ModalPreguntas from '../../components/ModalPreguntas.tsx';

const ListProductsView: React.FC = () => {

    type LaptopWithGama = LaptopDto & { gama?: string };
    const [laptops, setLaptops] = React.useState<LaptopWithGama[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const laptops = await laptopsServerApi.getAll();
                const predictionPromises = laptops.map(async (laptop) => {
                    try {
                        const prediction = await aiPredictionsServerApi.getByLaptopId(laptop.id);
                        return { laptopId: laptop.id, prediction };
                    } catch (error) {
                        console.warn(`Prediction failed for laptop ${laptop.id}`, error);
                        return { laptopId: laptop.id, prediction: null };
                    }
                });

                const predictions = await Promise.all(predictionPromises);
                const predictionMap = new Map(
                    predictions.map((item) => [item.laptopId, item.prediction])
                );

                const merged = laptops.map((laptop) => ({
                    ...laptop,
                    gama: predictionMap.get(laptop.id)?.gama_label ?? undefined
                }));

                console.log(merged);
                setLaptops(merged);
            } catch (error) {
                console.error("Error fetching laptops or predictions:", error);
            }
        };

        fetchData();
    }, []);

    const gamaAlta = laptops.filter((l) => l.gama === 'alta');
    const gamaMedia = laptops.filter((l) => l.gama === 'media');
    const gamaBaja = laptops.filter((l) => l.gama === 'baja');
    const [mostrarModal, setMostrarModal] = useState(false)


    return (
        <>
            <div className=' h-[10vh] md:h-[20vh] rounded-b-full gap-0'>
                <img className='h-full w-full' src={Borde_home} />
            </div>

            <div className='flex flex-col md:flex-row-reverse justify-center items-center px-6 md:px-10 gap-8 md:gap-[6%]'>
                <div className='w-full md:w-[40vw] h-[45%] md:h-[40%] flex items-center justify-center rounded-lg'>
                    <img
                        src={Logo_transparente}
                        alt='Logo'
                        className='w-[50%] md:w-auto pt-4 md:pt-0 max-h-full object-contain'
                    />
                </div>
                <div className='w-full md:w-[40vw] h-[35vh] md:h-[50vh] flex items-center justify-center rounded-lg float-smooth'>
                    <img
                        src={Laptop_home}
                        alt='Promoción'
                        className='w-auto max-h-full object-contain'
                    />
                </div>
            </div>

            <button onClick={() => setMostrarModal(true)} className="bg-[#14489D] text-white text-xl mt-6 px-4 font-medium hover:font-bold py-2 rounded-full flex items-center justify-center mx-auto mb-10 montserrat transition hover:bg-[#10397d] transition">
                Buscar mi laptop ideal
            </button>

            {mostrarModal && <ModalPreguntas onClose={() => setMostrarModal(false)} />}
            <div className="px-4 md:px-40 py-20 w-full font-semibold text-center md:text-left">
                <h2 className="text-4xl mb-10 montserrat">Laptops de gama alta</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center md:px-28">
                    {
                        gamaAlta.length > 0 && gamaAlta.map((laptop) => (
                            <CardsProduct
                                laptop={laptop}
                                imageSrc="https://via.placeholder.com/150"
                            />
                        ))
                    }
                </div>
            </div>

            <div className="px-4 md:px-40 py-20 w-full bg-[#14489D] font-semibold text-center md:text-left">
                <h2 className="text-4xl text-white mb-10 montserrat">Laptops de gama media</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center md:px-28">
                    {
                        gamaMedia.length > 0 && gamaMedia.map((laptop) => (
                            <CardsProduct
                                laptop={laptop}
                                imageSrc="https://via.placeholder.com/150"
                            />
                        ))
                    }
                </div>
            </div>

            <div className="px-4 md:px-40 py-20 w-full font-semibold text-center md:text-left">
                <h2 className="text-4xl mb-10 montserrat">Laptops de gama baja</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center md:px-28">
                    {
                        gamaBaja.length > 0 && gamaBaja.map((laptop) => (
                            <CardsProduct
                                laptop={laptop}
                                imageSrc="https://via.placeholder.com/150"
                            />
                        ))
                    }
                </div>
            </div>

        </>
    )
};

export default ListProductsView;
