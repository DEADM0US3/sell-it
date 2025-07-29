import React from 'react';
import { CardsProduct } from '../../layout/components/CardProduct';

const HomeView: React.FC = () => {
    return (
        <>
            <div className='bg-[#14489D] w-full h-[20vh] rounded-b-full'></div>

            <div className='flex justify-between mt-4 px-10'>
                <div className='bg-slate-200 w-[20vw] h-[30vh] flex items-center justify-center rounded-lg shadow-md'>
                    Imagen
                </div>
                <div>
                    <img
                        className='w-[20vw] rounded-lg shadow-md'
                        src='https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00075976321504-1l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
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

            <div className='w-full my-[8vh] px-8'>
                <div className='flex '>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='min-w-[250px] max-w-[250px]'>
                            <CardsProduct />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeView;
