import { CardsProduct } from '../../layout/components/CardProduct';
import Logo_transparente from '../../../assets/img/Logo_transparente.png';
import Borde_home from '../../../assets/img/Borde_home.png';
import Flecha_izquierda from '../../../assets/img/Flecha_izquierda.png';
import Flecha_derecha from '../../../assets/img/Flecha_derecha.png'
import Fond_pago from '../../../assets/img/Fond_pago.jpeg'
import Laptop_home from '../../../assets/img/Laptop_home.png'
import Logo_mercado from '../../../assets/img/Logo_mercado.jpeg'
import { Footer } from '../../layout/components/Footer';
import { laptopsServerApi } from '../../../infrastructure/http/features/laptopsServerApi';
import React, { useEffect, useState, useRef } from 'react';
import type { LaptopDto } from '../../../contracts/laptop/laptopDto';

const HomeView: React.FC = () => {
    const [data, setData] = useState<LaptopDto[]>()

    const fetchData = async() => {
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

        const scrollRight = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
        };

    


    return (
        
        <>
            <div className=' w-full md:h-[10vh] rounded-b-full'>
                <img className='h-[15vh] w-full' src={Borde_home}/>
            </div>

               <div className='flex flex-col md:flex-row justify-center items-center px-6 md:px-10 gap-8 md:gap-[6%] mt-[6vh] md:mt-[22vh]'>
                    <div className='w-full md:w-[40vw] h-[30vh] md:h-[40vh] flex items-center justify-center rounded-lg'>
                        <img
                        src={Logo_transparente}
                        alt='Logo'
                        className='w-auto max-h-full object-contain'
                        />
                    </div>
                    <div className='w-full md:w-[40vw] h-[35vh] md:h-[50vh] flex items-center justify-center rounded-lg'>
                        <img
                        src={Laptop_home}
                        alt='Promoción'
                        className='w-auto max-h-full object-contain'
                        />
                    </div>
                </div>

            <div className='flex justify-center my-4'>
                <button className='bg-[#14489D] w-[25vw] md:w-[12vw] text-white rounded-md py-2 shadow-md hover:bg-[#123c80] transition'>
                    Ir a tienda
                </button>
            </div>

            <div className='bg-[#14479D] w-full h-[10vh] mt-[2vh] flex items-center justify-center'>
                <p className='text-white text-center font-semibold text-2xl'>
                    Conoce todas nuestras promociones
                </p>
            </div>
              <div className='w-full h-[80vh] flex flex-col border-t shadow-lg border-t-slate-400 my-[8vh] px-8 relative'>
                <div className='mb-4 px-[5vw] mt-[6vh] justify-between flex'>
                   <div>
                        <p className='font-semibold text-[#484848] text-2xl mb-1'>Lo más vendido de Sell It</p>
                        <span className='text-[#484848]'>Laptops que vuelan... ¡no te quedes sin la tuya!</span>
                    </div>
                    <div>
                        <button className='bg-[#1E4E9C] text-white w-[25vw] md:w-[8vw] h-[4vh] rounded-2xl'>
                            Ver todo
                        </button>
                    </div>
                </div>
                <div className='flex items-center justify-center flex-1 relative'>
                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                    <img className='w-[2vw] h-[2vw] cursor-pointer' src={Flecha_izquierda} alt='Flecha izquierda' />
                    </div>

                    <div ref={scrollRef} className='overflow-x-auto overflow-y-hidden scrollbar-hide flex gap-4'>
                    {
                        data && (
                            data.map((item, index) => (
                                <div key={index} className='min-w-[250px] max-w-[250px]'>
                                <CardsProduct laptop={item}/>
                                </div>
                            ))
                        )
                    }
                    </div>
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                    <img className='w-[2vw] h-[2vw] cursor-pointer '  onClick={scrollRight} src={Flecha_derecha} alt='Flecha derecha'  />
                    </div>

                </div>
                </div>
                <div className='relative w-full h-[80vh]'>
            <img
                className='w-full h-full '
                src={Fond_pago}
                alt='Fondo de pago'
            />
                <div className='absolute md:text-sm top-1/2 right-0 md:right-12 transform -translate-y-1/2 max-w-full md:max-w-[40vw] min-w-full md:min-w-[5vw] px-4 md:px-0md:rounded-none'
                >
                <div className='text-2xl md:text-3xl text-[#14489D] font-bold mb-4'>
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

            <Footer />
            </div>

        </>
    );
};
export default HomeView;
