import React from 'react';
import BeginContainerStyle from "../../components/BeginContainerStyle.tsx";
import { CardDetail } from '../../components/CardDetails.tsx';

const ProductsView: React.FC = () => {
    return (
        <>
            <BeginContainerStyle>
                <div className="flex justify-between items-center px-40 py-5">
                    <CardDetail />
                </div>

                <div className='w-[90vw] md:w-[60vw] my-[10vh] mx-auto flex flex-col items-center md:items-start text-[#14479D]'>
                    <h2 className='text-left w-full'>
                        Dell Inspiron G3 3500s
                    </h2>
                    <p>Bienvenido a su iniciación.</p>

                    <p className='text-center md:text-justify w-full'>
                        Laptop para juegos de 15 pulgadas diseñada con tecnología dinámica Game Shift, 
                        gráficos discretos NVIDIA® GeForce® y procesadores Intel® de hasta 10.ª generación.
                    </p>
                </div>
            </BeginContainerStyle>

        </>
    );
}

export default ProductsView;
