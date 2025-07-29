import React from 'react';
import { CardsProduct } from '../../layout/components/CardProduct';
import Logo_transparente from '../../../assets/img/Logo_transparente.png';
import Borde_home from '../../../assets/img/Borde_home.png';
import Flecha_izquierda from '../../../assets/img/Flecha_izquierda.png';
import Flecha_derecha from '../../../assets/img/Flecha_derecha.png'
import Fondo_pago from '../../../assets/img/Fondo_pago.png'
import Laptop_home from '../../../assets/img/Laptop_home.png'

const HomeView: React.FC = () => {
    return (
        <>
            <div className=' w-full h-[10vh] rounded-b-full'>
                <img className='h-[25vh] w-full' src={Borde_home}/>
            </div>

                <div className='flex justify-center items-center px-10 gap-[10%] mt-[20vh]'>
                    <div className=' flex items-center justify-center rounded-lg'>
                        <img src={Logo_transparente} alt='Logo' className='w-[30vw]  max-h-full max-w-full object-contain' />
                    </div>
                    <div className='w-[20vw] h-[30vh] flex items-center justify-center rounded-lg'>
                        <img
                        className='max-h-full max-w-full object-contain'
                        src={Laptop_home}
                        alt='Promoción'
                        />
                    </div>
                </div>

            <div className='flex justify-center my-4'>
                <button className='bg-[#14489D] w-[12vw] text-white rounded-md py-2 shadow-md hover:bg-[#123c80] transition'>
                    Ir a tienda
                </button>
            </div>

            <div className='bg-[#14479D] w-full h-[10vh] mt-[2vh] flex items-center justify-center'>
                <p className='text-white font-semibold text-2xl'>
                    Conoce todas nuestras promociones
                </p>
            </div>

           <div className='w-full h-[60vh] flex items-center justify-center border-t shadow-lg border-t-slate-400 my-[8vh] px-8 relative'>

                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                    <img className='w-[2vw] h-[2vw] cursor-pointer' src={Flecha_izquierda} alt='Flecha izquierda' />
                </div>

                <div className='flex gap-4 '>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='min-w-[250px] max-w-[250px]'>
                            <CardsProduct />
                        </div>
                    ))}
                </div>
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                    <img className='w-[2vw] h-[2vw] cursor-pointer' src={Flecha_derecha} alt='Flecha derecha' />
                </div>
            </div>

            <div>
                <img className='w-full' src={Fondo_pago}/>
            </div>

        </>
    );
};

export default HomeView;
