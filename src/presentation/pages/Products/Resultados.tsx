import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../layout/components/Navbar'
import { Footer } from '../../layout/components/Footer'

export default function Resultados() {
  const [resumen, setResumen] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const resumenGuardado = localStorage.getItem('resumenLaptop')
    if (resumenGuardado) {
      setResumen(resumenGuardado)
    } else {
      // Si no hay resumen, redirige de vuelta
      navigate('/')
    }
  }, [])

  return (
    <>
    <Navbar />
    <div className="min-h-[82vh] flex items-center justify-center bg-gray-50 montserrat p-6">
      <div className="bg-white border-4 border-[#14489D] rounded-3xl p-8 max-w-lg w-full text-center shadow-lg">
        <h1 className="text-2xl font-bold text-[#14489D] mb-4">¡Listo! ✨</h1>
        <p className="text-gray-700 text-lg font-medium">{resumen}</p>

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
