import {
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    Award,
    Target,
    // TrendingUp,
    CheckCircle, Info,
} from 'lucide-react'
import type {AiPredictionDto} from "../../../../contracts/ai-prediction/ai-predictionDto.ts";
import type {LaptopDto} from "../../../../contracts/laptop/laptopDto.ts";

export interface RecommendationCardProps {
    prediction: AiPredictionDto
    product: LaptopDto
}

export const RecommendationCard = ({prediction, product}: RecommendationCardProps) => {
    // Determinar si está recomendado
    const isRecommended = prediction.priceperformance_label === 'yes'

    type RecKey = 'yes' | 'no'
    type GamaKey = AiPredictionDto['gama_label']

    // Colores para recomendación
    const recColors: Record<RecKey, { bg: string; border: string; text: string }> = {
        yes: {bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700'},
        no: {bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700'},
    }
    const gamaColors: Record<GamaKey, { bg: string; text: string }> = {
        alta: {bg: 'bg-indigo-600', text: 'text-indigo-700'},
        media: {bg: 'bg-purple-600', text: 'text-purple-700'},
        baja: {bg: 'bg-yellow-600', text: 'text-yellow-700'},
    }

    const recKey: RecKey = isRecommended ? 'yes' : 'no'
    const rec = recColors[recKey]
    const gamaKey: GamaKey = prediction.gama_label.toLowerCase() as GamaKey
    const gamma = gamaColors[gamaKey] || {bg: 'bg-gray-300', text: 'text-gray-500'}

    return (
        <div className="shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl overflow-hidden">
            <div
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-3xl font-bold">
                    <Sparkles className="w-8 h-8"/>
                    Recomendación de Sell IT
                </div>
                <span className="bg-white/20 text-white border border-white/30 px-2 py-1 rounded uppercase text-sm">
          IA
        </span>
            </div>

            <div className="p-8 space-y-6">

                <div
                    className={`p-6 rounded-xl border-2 mb-6 ${
                        isRecommended
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-100 border-gray-200'
                    }`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        {isRecommended ? (
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                <ThumbsUp className="w-8 h-8 text-white"/>
                            </div>
                        ) : (
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                                <Info className="w-8 h-8 text-white"/>
                            </div>
                        )}
                        <div>
                            <h3
                                className={`text-2xl font-bold ${
                                    isRecommended ? 'text-green-600' : 'text-gray-700'
                                }`}
                            >
                                {isRecommended
                                    ? 'Recomendado para ti'
                                    : 'Quizás prefieras otra opción'}
                            </h3>
                        </div>
                    </div>

                    <p className="text-gray-600">
                        {isRecommended
                            ? 'Este modelo ofrece una excelente relación calidad/precio y se ajusta a tus necesidades.'
                            : 'Te invitamos a explorar otros modelos con características o precios que podrían interesarte más.'}
                    </p>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gama */}
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gamma.bg}`}>
                                <Award className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <p className="font-medium text-gray-600">Gama del producto</p>
                                <p className={`text-xl font-bold ${gamma.text}`}>{prediction.gama_label}</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full ${gamma.bg}`}
                                style={{width: prediction.gama_label === 'alta' ? '90%' : prediction.gama_label === 'media' ? '60%' : '30%'}}
                            />
                        </div>
                    </div>

                    {/* Calidad-Precio */}
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    prediction.priceperformance_label === 'yes'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                }`}
                            >
                                <Target className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <p className="font-medium text-gray-600">Calidad-Precio</p>
                                <p
                                    className={`text-xl font-bold ${
                                        prediction.priceperformance_label === 'yes'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {prediction.priceperformance_label === 'yes' ? 'Sí' : 'No'}
                                </p>
                            </div>
                        </div>

                        {/* Mensaje explicativo */}
                        <p className="text-sm text-gray-500 mt-2">
                            {prediction.priceperformance_label === 'yes'
                                ? 'Este producto ofrece una excelente relación calidad/precio.'
                                : 'Este producto no cumple con una relación calidad/precio competitiva.'}
                        </p>
                    </div>


                    {/* Resumen */}
                    <div className=" col-span-2 bg-white p-6 rounded-xl shadow-md border border-indigo-200">
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Análisis de Sellit</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Esta laptop{' '}
                                    <strong>{product.brand} {product.model}</strong>{' '}
                                    es de gama <strong>{prediction.gama_label.toLowerCase()}</strong>.
                                    {isRecommended
                                        ? ' Consideramos que es una excelente opción para tu presupuesto y necesidades.'
                                        : ' Creemos que podrías encontrar mejores alternativas en el mercado.'}
                                </p>

                                {isRecommended && (
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600"/>
                                            <span className="font-semibold text-green-800">
                      ¡Producto recomendado por Sellit!
                    </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendationCard
