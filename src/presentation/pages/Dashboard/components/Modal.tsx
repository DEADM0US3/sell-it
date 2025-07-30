import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'sonner';
import type { LaptopCreateDto } from '../../../../contracts/laptop/laptopCreateDto.ts';
import { laptopsServerApi } from '../../../../infrastructure/http/features/laptopsServerApi.ts';
import { authServerApi } from '../../../../infrastructure/http/features/authServerApi.ts';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [stepper, setStepper] = useState(false)
    const [file, setFile] = useState<File | null>(null);

    const [laptop, setLaptop] = useState<LaptopCreateDto>({
        seller_id: '',
        title: '',
        brand: '',
        model: '',
        cpu: '',
        ram_gb: 0,
        storage_gb: 0,
        storage_type: 'eMMC',
        gpu: '',
        screen_size: 0,
        touch_support: false,
        battery_life_hours: 0,
        condition: 'used',
        description: '',
        price: 0,
        stock: 0,
        image_url: null,
    })

    const fetchUser = async() => {
        const id = await authServerApi.getUserId()
        setLaptop(prev => ({
            ...prev,
            seller_id: id
        }))
    }
    useEffect(() => {
        fetchUser()
    }, [])


    const api = 'http://localhost:8000/models/validate-laptop'

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
        setLaptop(prev => ({
            ...prev,
            [name]: name === 'ram_gb' || name === 'storage_gb' || name === 'screen_size' || name === 'battery_life_hours' || name === 'price'
                ? Number(value)
                : value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        console.log(laptop.touch_support)
        setLaptop(prev => ({
            ...prev,
            [name]: checked
        }))}

    const handleSubmit = async () => {
        if (!file) {
            toast.error('Por favor, selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', laptop.title);

        if (stepper === true) {
            try {
                const response = await laptopsServerApi.create(laptop, file);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        const promise = axios.post(api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.promise(promise, {
            loading: 'Subiendo imagen...',
            success: 'Muy bien, falta poco',
            error: 'El nombre y la imagen no coinciden',
        });

        promise
            .then(response => {
                setStepper(true);
                console.log(response);
                onClose(); // Cierra el modal después de completar la operación
            })
            .catch(error => {
                console.error(error);
            });
    };

    
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500/50 transition-opacity z-0" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                className="relative z-10 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
                >
                <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {title || 'Publicar nueva laptop'}
                    </h3>

                    {
                        stepper == false ? (
                        <>
                        <div className="mt-4">
                            <div className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                                onChange={handleImageChange}
                            />
                            {
                                !imagePreview && (
                                    <div className="text-center">
                                        <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        <label htmlFor="file-upload" className="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span className="text-indigo-600"> or browse</span>
                                            <span> to upload</span>
                                        </label>
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )
                            }
                            {imagePreview && (
                                <img src={imagePreview} className="mt-4 mx-auto max-h-40" alt="Preview" />
                            )}
                            </div>
                        </div>

                        {/* Título del producto */}
                        <div className="flex flex-col mt-4">
                            <label htmlFor="title">Nombre del producto</label>
                            <input
                            id="title"
                            type="text"
                            placeholder="Titulo"
                            name="title"
                            value={laptop.title}
                            onChange={handleInputChange}
                            className="mt-1 border border-black px-3 py-1 rounded-md"
                            />
                        </div>
                        </>
                        ) : (
                            <>
                            <div className="mt-4 grid grid-cols-4 gap-4 items-start">
                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="brand">Marca</label>
                                    <input
                                    id="brand"
                                    type="text"
                                    placeholder="Titulo"
                                    name="brand"
                                    value={laptop.brand}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="brand">Modelo</label>
                                    <input
                                    id="brand"
                                    type="text"
                                    placeholder="Modelo"
                                    name="model"
                                    value={laptop.model}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col col-span-3">
                                    <label htmlFor="brand">Descripción</label>
                                    <textarea
                                    id="description"
                                    placeholder="Descripción"
                                    name="description"
                                    value={laptop.description}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md h-8"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="price">Precio</label>
                                    <input
                                    id="price"
                                    type="text"
                                    placeholder="12000"
                                    name='price'
                                    value={laptop.price}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="condition">Condición</label>
                                    <select
                                    id="condition"
                                    name='condition'
                                    value={laptop.condition}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="new">Nuevo</option>
                                        <option value="used">Usado</option>
                                        <option value="refurbished">Reacondicionado</option>
                                    </select>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="cpu">Procesador</label>
                                    <input
                                    id="cpu"
                                    type="text"
                                    placeholder="Procesor"
                                    name="cpu"
                                    value={laptop.cpu}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="cpu">Ram en Gb</label>
                                    <input
                                    id="ram"
                                    type="text"
                                    placeholder="Ram"
                                    name="ram_gb"
                                    value={laptop.ram_gb}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="cpu">Espacio almac.</label>
                                    <input
                                    id="cpu"
                                    type="text"
                                    placeholder="Procesor"
                                    name='storage_gb'
                                    value={laptop.storage_gb}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="cpu">Tipo de almac.</label>
                                    <select
                                        id="storage_type"
                                        value={laptop.storage_type}
                                        name="storage_type"
                                        onChange={handleInputChange}
                                        className="mt-1 border border-black px-3 py-1 rounded-md"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="HDD">HDD</option>
                                        <option value="SSD">SSD</option>
                                        <option value="NVMe">NVMe</option>
                                        <option value="eMMC">eMMC</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="gpu">GPU</label>
                                    <input
                                    id="gpu"
                                    type="text"
                                    placeholder="Gpu"
                                    name='gpu'
                                    value={laptop.gpu}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="screen_size">Tamaño de pant.</label>
                                    <input
                                    id="screen_size"
                                    type="text"
                                    placeholder='16"'
                                    name='screen_size'
                                    value={laptop.screen_size}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="battery_life_hours">Duracion bateria</label>
                                    <input
                                    id="battery_life_hours"
                                    type="text"
                                    placeholder='16'
                                    name='battery_life_hours'
                                    value={laptop.battery_life_hours}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="stock">Stock</label>
                                    <input
                                    id="stock"
                                    type="text"
                                    placeholder='16'
                                    name='stock'
                                    value={laptop.stock}
                                    onChange={handleInputChange}
                                    className="mt-1 border border-black px-3 py-1 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="touch_support">Touch display
                                        <input
                                        id="touch_support"
                                        type="checkbox"
                                        placeholder="touch_support"
                                        name='touch_support'
                                        value={laptop.touch_support}
                                        onChange={handleCheckboxChange}
                                        className="mt-1 border border-black px-3 py-1 rounded-md"
                                        />
                                    </label>
                                </div>
                            </div>
                            </>
                        )
                    }

                    </div>
                </div>

                {/* Botones */}
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                        Aceptar
                    </button>
                    </span>
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                        Cancelar
                    </button>
                    </span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Modal