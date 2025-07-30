import React from "react";
import { toast } from "sonner";
import type { LaptopDto } from "../../../../contracts/laptop/laptopDto.ts";
import { laptopsServerApi } from "../../../../infrastructure/http/features/laptopsServerApi.ts";
import {
    useForm,
    FormProvider,
    type FieldErrors,
} from 'react-hook-form';
import type { LaptopCreateDto } from "../../../../contracts/laptop/laptopCreateDto.ts";

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
    const methods = useForm<LaptopCreateDto>({
        defaultValues: {
            ...laptopToEdit,
        },
    });

    const {
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
    } = methods;

    const touchSupport = watch('touch_support');

    const handleUpdate = async (data: LaptopCreateDto) => {
        try {
            const updatedLaptop: LaptopDto = {
                ...laptopToEdit,
                ...data,
            };

            console.log("Actualizando laptop:", updatedLaptop);

            await laptopsServerApi.update(updatedLaptop);
            toast.success("Laptop actualizada con éxito");
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Error actualizando laptop:", error);
            toast.error("Ocurrió un error al actualizar");
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center bg-gray-600/20 justify-center h-screen ">
                <div className="fixed inset-0 " onClick={onClose} />
                <div className="bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-3xl relative">
                    <h2 className="text-xl font-semibold mb-4">Editar Laptop</h2>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                    {[
                                        { id: 'brand', label: 'Marca', type: 'text' },
                                        { id: 'model', label: 'Modelo', type: 'text' },
                                        {
                                            id: 'condition',
                                            label: 'Condición',
                                            type: 'select',
                                            options: [
                                                { value: 'new', label: 'Nuevo' },
                                                { value: 'used', label: 'Usado' },
                                                { value: 'refurbished', label: 'Reacondicionado' },
                                            ],
                                        },
                                        { id: 'cpu', label: 'CPU', type: 'text' },
                                        { id: 'gpu', label: 'GPU', type: 'text' },
                                        { id: 'ram_gb', label: 'RAM (GB)', type: 'number' },
                                        { id: 'storage_gb', label: 'Almacenamiento (GB)', type: 'number' },
                                        {
                                            id: 'storage_type',
                                            label: 'Tipo almacenamiento',
                                            type: 'select',
                                            options: [
                                                { value: 'eMMC', label: 'eMMC' },
                                                { value: 'SSD', label: 'SSD' },
                                            ],
                                        },
                                        { id: 'screen_size', label: 'Pantalla (")', type: 'number' },
                                        { id: 'battery_life_hours', label: 'Batería (hrs)', type: 'number' },
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label
                                                htmlFor={field.id}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {field.label}
                                            </label>
                                            {field.type === 'select' ? (
                                                <select
                                                    id={field.id}
                                                    {...register(field.id as any, {
                                                        required: `${field.label} requerido`,
                                                    })}
                                                    className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:border-[#15489C] focus:ring-[#15489C] ${
                                                        errors[field.id as keyof FieldErrors] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                >
                                                    <option value="">Selecciona...</option>
                                                    {field.options!.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    id={field.id}
                                                    type={field.type}
                                                    {...register(field.id as any, {
                                                        required: `${field.label} requerido`,
                                                    })}
                                                    className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-[#15489C] focus:ring-[#15489C] ${
                                                        errors[field.id as keyof FieldErrors] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                            )}
                                            {errors[field.id as keyof FieldErrors] && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors[field.id as keyof FieldErrors]?.message as string}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                    {/* Toggle Pantalla Táctil */}
                                    <div className="flex items-center mt-2 col-span-3">
                                        <button
                                            type="button"
                                            id="touch_support"
                                            role="switch"
                                            aria-checked={touchSupport}
                                            onClick={() =>
                                                setValue('touch_support', !touchSupport)
                                            }
                                            className={`relative items-center inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                                                touchSupport ? 'bg-[#15489C]' : 'bg-gray-300'
                                            } focus:outline-none focus:ring-2 focus:ring-[#15489C] focus:ring-offset-2`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                                                    touchSupport ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                        <label
                                            htmlFor="touch_support"
                                            className="ml-3 text-sm font-medium text-gray-700"
                                        >
                                            ¿Tiene pantalla táctil?
                                        </label>
                                    </div>

                                    {/* Descripción */}
                                    <div className="md:col-span-3">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Descripción
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={3}
                                            {...register('description', {
                                                required: 'Descripción requerida',
                                            })}
                                            className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-[#15489C] focus:ring-[#15489C] resize-none ${
                                                errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.description.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#14489D] text-white px-4 py-2 rounded hover:bg-blue-500"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};
