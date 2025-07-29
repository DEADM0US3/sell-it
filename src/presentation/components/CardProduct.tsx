import Compu from '../../assets/img/Compu.png';
import type { LaptopDto } from '../../contracts/laptop/laptopDto.ts';
import {useNavigate} from "react-router-dom";

interface CardProductProps {
    laptop: LaptopDto;
    imageSrc: string;
}

export const  CardsProduct: React.FC<CardProductProps> = ({ laptop, imageSrc }) => {

    const navigate = useNavigate();

    const datos = {
        nombre: "Laptop victus hp gaming 15-Fa1098la intel core i5 16gb ram 1tb ssd",
        precio: "42",
        imagen: Compu
    };

    return (
        <div
            onClick={() => navigate(`/products/${laptop.id}`)}
            className=" w-[36vw] md:w-[14vw] h-[36vh] md:h-[46vh] rounded-lg flex flex-col relative  ">

                <div className='z-2 p-2'>
                    <img src={datos.imagen} alt={laptop.title} className="w-full object-cover rounded" />
                </div>

                <div className='z-1  bg-[#F3F3F3] rounded-m md:w-[14vw] absolute bottom-0 w-[40vw] h-[29vh] md:h-[28vh] shadow-2xl'>
                   <div className='md:py-[6vh] py-[10vh] mx-[1vw]'>
                        <h2 className=" font-semibold text-xs md:pt-[3vh] text-[#1E4E9C] mt-2 h-[10vh] overflow-clip">{laptop.title}</h2>
                        <div className="flex justify-between mt-[3vh]">
                            <div>
                                <p className="text-sm font-bold text-[#484848] md:mt-1 ">${laptop.price}</p>
                            </div>
                            <div >
                                <button className="bg-[#14489D] text-white rounded-full md:h-[5vh] w-[6vw] md:w-[2.5vw]">+</button>
                            </div>
                        </div>
                   </div>
                </div>

        </div>
    );
};
