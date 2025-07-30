import { AlertTriangle, CheckCircle } from 'lucide-react'

interface Props {
    product: { condition: 'new' | 'refurbished' | 'used' }
}

export const ProductConditionAlert: React.FC<Props> = ({ product }) => {
    return product.condition === 'new' ? (
        // OJO: si prefieres ocultar completamente el mensaje, reemplaza esto por `null`
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-medium text-green-800">Producto completamente nuevo</p>
            </div>
        </div>
    ) : (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <div>
                    <p className="font-medium text-amber-800">Estado del producto</p>
                    <p className="text-amber-700">
                        {product.condition === 'refurbished'
                            ? 'Producto reacondicionado con garantía'
                            : 'Producto usado en buen estado'}
                    </p>
                </div>
            </div>
        </div>
    )
}
