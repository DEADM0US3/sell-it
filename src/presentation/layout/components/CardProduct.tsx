import Compu from '../../../assets/img/Compu.png';
import type { LaptopDto } from '../../../contracts/laptop/laptopDto';

interface CardProductProps {
    laptop: LaptopDto;
    imageSrc: string;
}

export const  CardsProduct: React.FC<CardProductProps> = ({ laptop, imageSrc }) => {
    const datos = {
        nombre: "Laptop victus hp gaming 15-Fa1098la intel core i5 16gb ram 1tb ssd",
        precio: "42",
        imagen: Compu
    };

    return (
        <div className=" w-[36vw] md:w-[14vw] h-[36vh] md:h-[44vh] rounded-lg flex flex-col relative  ">
            
                <div className='z-2 p-2'>
                    <img src={datos.imagen} alt={datos.nombre} className="w-full object-cover rounded" />
                </div>

                <div className='z-1  bg-[#F3F3F3] rounded-md absolute bottom-0 h-[29vh] md:h-[28vh] shadow-2xl'>
                   <div className='md:py-[6vh] py-[10vh] mx-[1vw]'>
                        <h2 className=" font-semibold text-xs md:pt-[4vh] text-[#1E4E9C] mt-2">{laptop.title}</h2>
                        <div className="flex justify-between mt-[3vh]">
                            <div>
                                <p className="text-sm font-bold text-[#484848] md:mt-2 ">${laptop.price}</p>
                            </div>
                            <div>
                                <button className="bg-[#14489D] text-white rounded-full md:h-[5vh] w-[6vw] md:w-[2.5vw]">+</button>
                            </div>
                        </div>
                   </div>
                </div>
            
        </div>
    );
};
