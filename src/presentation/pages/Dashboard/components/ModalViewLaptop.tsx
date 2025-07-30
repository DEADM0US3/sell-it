import React, { useState } from "react";
import { toast } from "sonner";
import type { LaptopDto } from "../../../../contracts/laptop/laptopDto.ts";
import { laptopsServerApi } from "../../../../infrastructure/http/features/laptopsServerApi.ts";
import axios from "axios";

interface ModalEditarLaptopProps {
    laptopToEdit: LaptopDto;
    onClose: () => void;
    onUpdated: () => void;
}

export const ModalEditarLaptop: React.FC<ModalEditarLaptopProps> = ({
                                                                        laptopToEdit,
                                                                        onClose,
                                                                        onUpdated,
                                                                    }) => {
    const [laptop, setLaptop] = useState<LaptopDto>(laptopToEdit);

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


    const handleUpdate = async () => {
        if (
            !laptop.title ||
            !laptop.cpu ||
            !laptop.gpu ||
            !laptop.ram_gb ||
            !laptop.storage_gb ||
            !laptop.description ||
            !laptop.price
        ) {
            toast.error("Completa todos los campos");
            return;
        }

        try {

            console.log("Actualizando laptop:", laptop);

            await laptopsServerApi.update(laptop);
            toast.success("Laptop actualizada con éxito");
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Error actualizando laptop:", error);
            toast.error("Ocurrió un error al actualizar");
        }
    };

    // const handleUpdate = async () => {
    //
    //     try {
    //         const response = await laptopsServerApi.update(laptop);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //
    // };


    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center bg-gray-600/20 justify-center h-screen ">
                <div className="fixed inset-0 " onClick={onClose} />
                <div className="bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-3xl relative">
                    <h2 className="text-xl font-semibold mb-4">Editar Laptop</h2>

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

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="bg-gray-200 transition hover:bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-[#14489D] text-white px-4 py-2 rounded transition hover:bg-blue-500"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
