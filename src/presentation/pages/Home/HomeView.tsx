
import Logo_transparente from '../../../assets/img/logo_01.png';
import Borde_home from '../../../assets/img/Borde_home.png';
import Flecha_izquierda from '../../../assets/img/Flecha_izquierda.png';
import Flecha_derecha from '../../../assets/img/Flecha_derecha.png'
import Fond_pago from '../../../assets/img/Fond_pago.jpeg'
import Laptop_home from '../../../assets/img/36ce44f3-5765-40b3-b2c2-6f6179579726.png'
import Logo_mercado from '../../../assets/img/Logo_mercado.jpeg'
import { laptopsServerApi } from '../../../infrastructure/http/features/laptopsServerApi';
import React, { useEffect, useState, useRef } from 'react';
import type { LaptopDto } from '../../../contracts/laptop/laptopDto';
import { CardsProduct } from "../../components/CardProduct.tsx";
import image10 from '@/assets/img/image10.png';

const HomeView: React.FC = () => {
    const [data, setData] = useState<LaptopDto[]>()

    const fetchData = async () => {
        try {
            const response = await laptopsServerApi.getAll()
            setData(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollRef.current) return;

            const scrollContainer = scrollRef.current;
            const firstCard = scrollContainer.firstChild;
            const cardWidth = firstCard instanceof HTMLElement ? firstCard.clientWidth : 0;
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            // Si llegó al final, regresa al principio
            if (scrollContainer.scrollLeft + cardWidth >= maxScrollLeft) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24 = gap-6
            }
        }, 2000); // cada 4 segundos

        return () => clearInterval(interval); // limpia el intervalo al desmontar
    }, []);



    return (

        <>
            <div className=' h-[10vh] md:h-[20vh] rounded-b-full gap-0'>
                <img className='h-full w-full' src={Borde_home} />
            </div>

            <div className='flex flex-col md:flex-row justify-center items-center px-6 md:px-10 gap-8 md:gap-[6%]'>
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

            <div className='flex justify-center my-4 pb-[5%]'>
                <button className='bg-[#14489D] w-[25vw] md:w-[12vw] text-white  py-3 shadow-md hover:bg-[#123c80] transition rounded-3xl montserrat font-semibold hover:font-bold'>
                    Ir a tienda
                </button>
            </div>

            <div className='bg-[#14479D] w-full h-[10vh] mt-[2vh] flex items-center justify-center mx-auto'>
                <p className='text-[#E4E9F5] text-center font-semibold text-2xl md:text-5xl montserrat'>
                    Conoce todas nuestras promociones
                </p>
            </div>
            <div className='w-full h-[80vh] flex flex-col  border-t-slate-400 my-[8vh] px-8 relative montserrat'>
                <div className='mb-4 px-[5vw] mt-[3vh] md:mt-[6vh] flex flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left gap-4 md:items-center'>
                    <div>
                        <p className='font-bold text-[#484848] text-5xl mb-1'>Lo más nuevo en Sell IT</p>
                        <span className='text-[#484848] font-medium text-xl'>Laptops al mejor precio... ¡no te quedes sin la tuya!</span>
                    </div>
                    <div>
                        <button className='bg-[#1E4E9C] text-white w-[25vw] md:w-[8vw] py-3 rounded-3xl'>
                            Ver todo
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-x-hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                    >
                        {data?.map((item, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 snap-start w-[85%] sm:w-[60%] md:w-[23%] min-w-[250px] max-w-[280px]"
                            >
                                <CardsProduct laptop={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='relative w-full h-[80vh] montserrat'>
                <img
                    className='w-full h-full '
                    src={Fond_pago}
                    alt='Fondo de pago'
                />
                <div className='absolute md:text-sm top-1/2 flex transform -translate-y-1/2 max-w-full md:max-w-[100vw] min-w-full md:min-w-[5vw] px-4 md:px-0md:rounded-none items-center justify-center w-full gap-24'
                >
                    <div className='flex flex-col items-center justify-center w-full md:w-[100vw]'>
                        <img
                            className='w-min-[500px] h-auto mb-[-12%] '
                            src={image10}
                            alt='Fondo de pago'
                        />
                    </div>
                    <div className='flex flex-col items-center justify-start w-full md:w-[100vw]'>
                        <div className='text-2xl md:text-3xl text-[#14489D] font-bold mb-4 justify-start'>
                            <p>Paga fácil y seguro</p>
                            <div className='flex items-center flex-wrap'>
                                <span>con Mercado Pago</span>
                                <img
                                    className='h-[5vh] w-auto ml-2'
                                    src={Logo_mercado}
                                    alt='Logo Mercado Pago'
                                />
                            </div>
                        </div>
                        <p className='mb-2 text-[#484848]'>
                            Elige el método que más se ajuste a ti:
                        </p>
                        <ul className='list-disc text-[#484848] list-inside mb-4'>
                            <li>Tarjeta de crédito</li>
                            <li>Tarjeta de débito</li>
                        </ul>
                        <p className='text-[#14479D] font-semibold'>
                            Tu pago se acredita al instante para procesar tu pedido sin demoras.
                        </p>
                    </div>

                </div>


            </div>

        </>
    );
};
export default HomeView;
