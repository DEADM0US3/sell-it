import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const preguntas = [
    {
        texto: '¿Para qué la vas a usar?',
        campo: 'uso',
        opciones: [
            'Tareas o escuela',
            'Trabajo de oficina',
            'Edición de fotos o videos',
            'Jugar videojuegos',
            'Un poco de todo',
        ],
    },
    {
        texto: '¿Cuánto puedes gastar más o menos?',
        campo: 'presupuesto',
        opciones: [
            'Menos de $8,000',
            'Entre $8,000 y $12,000',
            'Entre $12,000 y $18,000',
            'Más de $18,000',
        ],
    },
    {
        texto: '¿Cuánto tiempo la vas a usar al día?',
        campo: 'tiempo',
        opciones: [
            'Menos de 3 horas',
            '3 a 6 horas',
            'Todo el día',
        ],
    },
    {
        texto: '¿Tienes alguna marca en mente o te da igual?',
        campo: 'marca',
        opciones: [
            'HP',
            'Lenovo',
            'ASUS',
            'Apple',
            'Me da igual',
        ],
    },
]

export default function ModalPreguntas({ onClose }: { onClose: () => void }) {
    const [paso, setPaso] = useState(0)
    const [respuestas, setRespuestas] = useState<string[]>([])
    const [resumen, setResumen] = useState<string>('')
    const navigate = useNavigate()
    const manejarRespuesta = (opcion: string) => {
        const nuevasRespuestas = [...respuestas]
        nuevasRespuestas[paso] = opcion
        setRespuestas(nuevasRespuestas)

        const campo = preguntas[paso].campo
        let nuevoResumen = resumen

        const partes = {
            uso: `Buscas una laptop para ${opcion.toLowerCase()}, `,
            presupuesto: `con un presupuesto de ${opcion.toLowerCase()}, `,
            tiempo: `la usarás ${opcion.toLowerCase()} `,
            marca: `y ${opcion.toLowerCase()}.`,
        }

        const patrones = {
            uso: /Buscas una laptop para .*?,\s?/,
            presupuesto: /con un presupuesto de .*?,\s?/,
            tiempo: /la usarás .*?,\s?/,
            marca: /y .*?\.$/,
        }

        switch (campo) {
            case 'uso':
                nuevoResumen = nuevoResumen.replace(patrones.uso, '') + partes.uso
                break
            case 'presupuesto':
                nuevoResumen = nuevoResumen.replace(patrones.presupuesto, '') + partes.presupuesto
                break
            case 'tiempo':
                nuevoResumen = nuevoResumen.replace(patrones.tiempo, '') + partes.tiempo
                break
            case 'marca':
                nuevoResumen = nuevoResumen.replace(patrones.marca, '') + partes.marca
                break
        }

        setResumen(nuevoResumen)

        if (paso < preguntas.length - 1) {
            setPaso(paso + 1)
        } else {
            const resumenFinal = nuevoResumen.trim()
            localStorage.setItem('resumenLaptop', resumenFinal)
            navigate('/resultados')
        }
    }

    const volver = () => {
        if (paso > 0) {
            setPaso(paso - 1)
        }
    }

    const preguntaActual = preguntas[paso]


    return (
        <div className="fixed inset-0 bg-black-opacity-20 montserrat flex items-center justify-center z-50">
            <div className="bg-white border-4 border-[#14489D] rounded-3xl p-8 w-[90%] max-w-md shadow-xl text-center relative">
                <h2 className="text-xl font-semibold mb-6">{preguntaActual.texto}</h2>

                <div className="flex flex-col gap-4">
                    {preguntaActual.opciones.map((opcion, index) => (
                        <button
                            key={index}
                            onClick={() => manejarRespuesta(opcion)}
                            className="bg-white border-[#14489D] border-2 text-[#14489D] px-4 py-3 rounded-full hover:bg-[#10397d] hover:text-white transition"
                        >
                            {opcion}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                    {paso > 0 && (
                        <button onClick={volver} className="text-[#14489D] underline">
                            ⬅ Regresar
                        </button>
                    )}
                    <button onClick={onClose} className="text-gray-500 transition hover:text-red-500">
                        Cerrar ✖
                    </button>
                </div>

            </div>
        </div>
    )
}
