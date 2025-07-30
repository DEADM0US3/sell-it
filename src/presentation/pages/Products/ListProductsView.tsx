import React from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import Laptop from "../../../assets/Laptop.png";
import Mine from "../../../assets/Mine.png";
import {CardsProduct} from "../../components/CardProduct.tsx";
import {laptopsServerApi} from "../../../infrastructure/http/features/laptopsServerApi.ts";
import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";
import { aiPredictionsServerApi } from '../../../infrastructure/http/features/ai-predictionsServerApi.ts';

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


    return(
        <>
            <BeginContainerStyle>
                <div className="flex justify-between items-center px-40 py-5">
                    <img src={Laptop} />
                    <img  src={Mine} alt={""}/>
                </div>
            </BeginContainerStyle>

            <div className="
                px-40
                py-20
                w-full
                font-semibold
            ">
            <h2 className="text-4xl mb-10">Laptops de gama alta</h2>
                <div className="grid grid-cols-4 px-28">
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

            <div className="px-40 py-20 w-full bg-blue-600 font-semibold">
                <h2 className="text-4xl text-white mb-10">Laptops de gama media</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 px-28 pb-40">
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

            <div className="px-40 py-20 w-full  font-semibold">
                <h2 className="text-4xl  mb-10">Laptops de gama baja</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 px-28 pb-40">
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
