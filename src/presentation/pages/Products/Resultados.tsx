import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../layout/components/Navbar'
import { Footer } from '../../layout/components/Footer'
import {getRecommendations} from "../../../infrastructure/http/functions/fetchAndSavePrediction.ts";
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'


export default function Resultados() {
  const [resumen, setResumen] = useState<string | null>(null)
  const [recomendacion, setRecomendacion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const resumenGuardado = localStorage.getItem('resumenLaptop')
    if (!resumenGuardado) {
      // Si no hay resumen, redirige al inicio
      navigate('/')
      return
    }

    setResumen(resumenGuardado)
    setLoading(true)
    getRecommendations(resumenGuardado)
        .then(({ recommendation }) => {
          setRecomendacion(recommendation)
        })
        .catch(err => {
          console.error(err)
          setError('No se pudo obtener la recomendación. Intenta de nuevo.')
        })
        .finally(() => {
          setLoading(false)
        })
  }, [])

  return (
      <>
        <Navbar />
        <div className="min-h-[82vh] flex items-center justify-center bg-gray-50 montserrat p-6">
          <div className="bg-white border-4 border-[#14489D] rounded-3xl p-8 max-w-lg w-full text-center shadow-lg">
            <h1 className="text-2xl font-bold text-[#14489D] mb-4">¡Listo! ✨</h1>

              {loading && <p className="text-gray-600 text-lg font-medium">…Cargando…</p>}

              {error && <p className="text-red-500 text-lg font-medium">{error}</p>}

              {!loading && !error && recomendacion && (
                  <div className="prose prose-indigo text-left mx-auto">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {recomendacion}
                      </ReactMarkdown>
                  </div>
              )}

            <button
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 bg-[#14489D] text-white rounded-full hover:bg-[#10397d] transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
        <Footer />
      </>
  )
}
