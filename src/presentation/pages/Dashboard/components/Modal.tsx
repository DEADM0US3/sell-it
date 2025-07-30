import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Image, X } from 'lucide-react';
import {
    useForm,
    FormProvider,
    type FieldErrors,
} from 'react-hook-form';
import type {LaptopCreateDto} from "../../../../contracts/laptop/laptopCreateDto.ts";
import {authServerApi} from "../../../../infrastructure/http/features/authServerApi.ts";
import {laptopsServerApi} from "../../../../infrastructure/http/features/laptopsServerApi.ts";
import {predictLaptopPrice} from "../../../../infrastructure/http/functions/fetchAndSavePrediction.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const STEPS = ['Imagen', 'Detalles', 'Precio & Stock'];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    // Inicializa React Hook Form con valores por defecto
    const methods = useForm<LaptopCreateDto>({
        defaultValues: {
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
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        getValues,
        watch
    } = methods;

    const touchSupport = watch('touch_support');

    // Cargar seller_id
    useEffect(() => {
        authServerApi.getUserId().then((id) => {
            setValue('seller_id', id);
        });
    }, [setValue]);

    if (!isOpen) return null;

    // Cambia imagen y preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
    };

    // Navegar pasos
    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (data: LaptopCreateDto) => {
        // Paso final: envío al servidor
        try {
            await laptopsServerApi.create(data, file!);
            toast.success('Producto creado con éxito');
            handleCloseReset();
        } catch {
            toast.error('Error al crear el producto');
        }
    };

    const handleNext = async () => {
        if (currentStep === 0) {
            if (!file) {
                toast.error('Imagen requerida');
                return;
            }
            // Validación imagen API
            const formData = new FormData();
            formData.append('image', file);
            formData.append('description', getValues('title'));
            const api = 'http://localhost:8000/models/validate-laptop';
            const promise = axios.post(api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.promise(promise, {
                loading: 'Validando imagen…',
                success: 'Imagen válida',
                error: 'La imagen no coincide',
            });
            promise.then(() => setCurrentStep(1)).catch(() => {});
        } else if (currentStep === 1) {
            // Validar campos de detalles
            const valid = await trigger([
                'title',
                'brand',
                'model',
                'condition',
                'cpu',
                'gpu',
                'ram_gb',
                'storage_gb',
                'storage_type',
                'screen_size',
                'battery_life_hours',
                'description',
            ]);
            if (valid) {
                const predictPricePromise = predictLaptopPrice({
                    Model: getValues('title'),
                    Status: getValues('condition') === 'new' ? 'New' : 'Refurbished',
                    Brand: getValues('brand'),
                    CPU: getValues('cpu'),
                    RAM: getValues('ram_gb'),
                    Storage: getValues('storage_gb'),
                    Storage_type: getValues('storage_type'),
                    GPU: getValues('gpu'),
                    Screen: getValues('screen_size'),
                    Touch: getValues('touch_support') ? 'Yes' : 'No',
                })

                toast.promise(predictPricePromise, {
                    loading: 'Calculando precio…',
                    success: (predictedPrice) => {
                        setValue('price', predictedPrice);
                        setCurrentStep(2);
                        return `Te sugerimos un precio de $${predictedPrice.toLocaleString('es-MX')}`;
                    },
                    error: 'Error al calcular el precio',
                })

            }

        } else {
            // Validar precio y stock y someter
            const valid = await trigger(['price', 'stock']);
            if (valid) handleSubmit(onSubmit)();
        }
    };

    const handleCloseReset = () => {
        setCurrentStep(0);
        setImagePreview(null);
        setFile(null);
        methods.reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4 text-center">
                <div
                    className="fixed inset-0 bg-black/50"
                    onClick={handleCloseReset}
                />

                <div className="relative z-10 w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 truncate">
                            {title ||
                                (currentStep === 0
                                    ? 'Agregar nuevo producto'
                                    : currentStep === 1
                                        ? `Detalles de "${getValues('title')}"`
                                        : `Precio & Stock de "${getValues('title')}"`)}
                        </h2>
                        <button
                            onClick={handleCloseReset}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X />
                        </button>
                    </div>

                    <div className="flex items-center mb-8">
                        {STEPS.map((label, idx) => (
                            <React.Fragment key={label}>
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                            idx === currentStep
                                                ? 'border-[#15489C] bg-[#15489C] text-white'
                                                : 'border-gray-300 bg-white text-gray-500'
                                        }`}
                                    >
                                        {idx + 1}
                                    </div>
                                    <span
                                        className={`mt-2 text-sm ${
                                            idx === currentStep ? 'text-[#15489C] font-medium' : 'text-gray-500'
                                        }`}
                                    >
                    {label}
                  </span>
                                </div>
                                {idx < STEPS.length - 1 && <div className="h-px flex-1 bg-gray-200 mx-2" />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* FORM */}
                    <FormProvider {...methods}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-6">
                                {/* Paso 0 */}
                                {currentStep === 0 && (
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Imagen del producto
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                            />
                                            <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        className="h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <Image size={30} className="mx-auto text-gray-500" />
                                                        <p className="mt-2 text-sm text-gray-600">
                                                            Arrastra o haz clic para subir
                                                        </p>
                                                        {!file && (
                                                            <p className="mt-1 text-xs text-red-500">
                                                                * Requerido
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Título
                                            </label>
                                            <input
                                                required
                                                id="title"
                                                {...register('title', { required: 'Título requerido' })}
                                                type="text"
                                                className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-[#15489C] focus:ring-[#15489C] ${
                                                                             errors.title ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.title && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Paso 1 */}
                                {currentStep === 1 && (
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
                                                    // { value: 'HDD', label: 'HDD' },
                                                    { value: 'SSD', label: 'SSD' },
                                                    // { value: 'NVMe', label: 'NVMe' },
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
                                                aria-checked={getValues('touch_support')}
                                                onClick={() =>
                                                    setValue('touch_support', !touchSupport)
                                                }
                                                className={`relative items-center inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                                                                              getValues('touch_support') ? 'bg-[#15489C]' : 'bg-gray-300'
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
                                )}

                                {/* Paso 2 */}
                                {currentStep === 2 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Precio (MXN)
                                            </label>
                                            <input
                                                id="price"
                                                type="number"
                                                {...register('price', {
                                                    required: 'Precio requerido',
                                                    min: { value: 1, message: 'Debe ser mayor a 0' },
                                                })}
                                                className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-[#15489C] focus:ring-[#15489C] ${
                                                                              errors.price ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.price && (
                                                <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="stock"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Stock
                                            </label>
                                            <input
                                                id="stock"
                                                type="number"
                                                {...register('stock', {
                                                    required: 'Stock requerido',
                                                    min: { value: 1, message: 'Debe ser mayor a 0' },
                                                })}
                                                className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-[#15489C] focus:ring-[#15489C] ${
                                                                              errors.stock ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.stock && (
                                                <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* FOOTER */}
                            <div className="mt-8 flex justify-end space-x-3">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#15489C]"
                                    >
                                        Atrás
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="rounded-lg bg-[#15489C] px-6 py-2 text-sm font-semibold text-white hover:bg-[#133774] focus:outline-none focus:ring-2 focus:ring-[#15489C]"
                                >
                                    {currentStep < STEPS.length - 1 ? 'Siguiente' : 'Crear producto'}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default Modal;
