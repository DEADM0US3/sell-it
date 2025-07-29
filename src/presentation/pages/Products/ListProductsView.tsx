import React from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import Laptop from "../../../assets/Laptop.png";
import Mine from "../../../assets/Mine.png";
import {CardsProduct} from "../../components/CardProduct.tsx";
import {laptopsServerApi} from "../../../infrastructure/http/features/laptopsServerApi.ts";
import type {LaptopDto} from "../../../contracts/laptop/laptopDto.ts";

const ListProductsView: React.FC = () => {


    const [laptops, setLaptops] = React.useState<LaptopDto[]>([]);

    React.useEffect(() => {
        const fetchLaptops = async () => {
            try {
                const response = await laptopsServerApi.getAll();

                setLaptops(response);

            } catch (error) {
                console.error("Error fetching laptops:", error);
            }
        };

        fetchLaptops();
    }, []);


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

                <h2 className="text-4xl mb-10">Laptops Gamers</h2>

                <div className="grid grid-cols-4 px-28">
                    {
                        laptops.length > 0 && laptops.map((laptop) => (
                            <CardsProduct
                                laptop={laptop}
                                imageSrc="https://via.placeholder.com/150"
                            />
                        ))
                    }
                </div>


            </div>

            <div className="
                px-40
                py-20
                w-full
                bg-blue-600
                font-semibold
            ">

                <h2 className="text-4xl text-white mb-10">Laptops Genericas</h2>

                <div className="grid lg:grid-cols-4 grid-cols-2 px-28 pb-40">
                    {
                        laptops.length > 0 && laptops.map((laptop) => (
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
