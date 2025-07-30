import React, {useState, useEffect, useRef} from 'react';
import Flecha_izquierda from '../../../assets/img/Flecha_izquierda.png';
import Flecha_derecha from '../../../assets/img/Flecha_derecha.png'
import { CardsProduct } from '../../components/CardProduct';
import type { LaptopDto } from '../../../contracts/laptop/laptopDto';
import { laptopsServerApi } from '../../../infrastructure/http/features/laptopsServerApi';
import { authServerApi } from '../../../infrastructure/http/features/authServerApi';
import { userServerApi } from '../../../infrastructure/http/features/userServerApi';

const DashboardView: React.FC = () => {
    const [data, setData] = useState<LaptopDto[] | null>()
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
    };

    const fetchData = async() => {
        try {
            const user = await userServerApi.get()
            console.log(user?.id)
            if(user === null){
                return console.log('Nada aqui')
            }
            const response = await laptopsServerApi.getByUserId(user?.id)
            console.log(response)
            setData(response)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


    return(
    <>
    <div className='w-full flex justify-end py-4 px-8'>
        <button className='p-2 rounded-lg bg-blue-500 text-white semibold cursor-pointer'>Publicar nueva Laptop</button>
    </div>



        {
            data ? (
                <div className='flex items-center justify-center flex-1 relative'>
                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                        <img className='w-[2vw] h-[2vw] cursor-pointer' src={Flecha_izquierda} alt='Flecha izquierda' />
                    </div>
                        <div ref={scrollRef} className='overflow-x-auto overflow-y-hidden scrollbar-hide flex gap-4'>
                            { data.map((item, index) => (
                                <div key={index} className='min-w-[250px] max-w-[250px]'>
                                <CardsProduct laptop={item}/>
                                </div>
                            ))}
                        </div>
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10'>
                        <img className='w-[2vw] h-[2vw] cursor-pointer '  onClick={scrollRight} src={Flecha_derecha} alt='Flecha derecha'  />
                    </div>
                </div>
            ) : (
                <p>Aun no hay nada que ver aqui</p>
            )
        }
        

    </>
)
}

export default DashboardView;