import React from 'react'
import type { LaptopDto } from '../../../../contracts/laptop/laptopDto'
import { Battery, Cpu, HardDrive, Laptop, Monitor, Zap } from 'lucide-react'

export interface SpecItem {
    icon: React.ComponentType<{ className?: string }>
    color: string
    label: string
    value: string | number
}

export const SpecItemCard: React.FC<SpecItem> = ({ icon: Icon, color, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition hover:bg-gray-100 transition-colors">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
            <p className="font-medium text-gray-600 text-sm">{label}</p>
            <p className="font-semibold text-gray-900 text-lg">{value}</p>
        </div>
    </div>
)

type SpecGridProps = {
    items: SpecItem[]
}
export const SpecGrid: React.FC<SpecGridProps> = ({ items }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
            <SpecItemCard key={index} {...item} />
        ))}
    </div>
)

export interface ProductSpecsProps {
    product: LaptopDto
}
export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
    const specItems: SpecItem[] = [
        { label: 'Marca', value: product.brand, icon: Laptop, color: 'bg-blue-100 text-blue-600' },
        { label: 'Modelo', value: product.model, icon: Laptop, color: 'bg-blue-100 text-blue-600' },
        { label: 'Procesador', value: product.cpu, icon: Cpu, color: 'bg-purple-100 text-purple-600' },
        { label: 'Tarjeta gráfica', value: product.gpu, icon: Monitor, color: 'bg-indigo-100 text-indigo-600' },
        { label: 'RAM', value: `${product.ram_gb} GB `, icon: Zap, color: 'bg-green-100 text-green-600' },
        { label: 'Almacenamiento', value: `${product.storage_gb} GB (${product.storage_type})`, icon: HardDrive, color: 'bg-orange-100 text-orange-600' },
        { label: 'Pantalla', value: `${product.screen_size}"`, icon: Monitor, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Batería', value: `${product.battery_life_hours} hrs aprox.`, icon: Battery, color: 'bg-teal-100 text-teal-600' },
    ]

    return <SpecGrid items={specItems} />
}
