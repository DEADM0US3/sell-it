import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabaseClient } from "../../../infrastructure/http/clientProvider.ts";
import LoadingScreen from "../../components/LoadingScreen.tsx";

const SuccessPaymentView: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [msg, setMsg] = useState<string>();

    useEffect(() => {
        (async () => {
            const session_id = searchParams.get("session_id");
            const order_id   = searchParams.get("order_id");

            if (!session_id || !order_id) {
                setMsg("❌ Parámetros de pago faltantes");
                return;
            }

            const { data, error } = await supabaseClient.functions.invoke("verify-payment", {
                body: { session_id, order_id },
            });

            if (error) {
                console.error("Error en invoke:", error);
                setMsg("❌ Error al verificar el pago");
                return;
            }

            const payload = data as { success: boolean; payment_status?: string };

            if (payload.success) {
                setMsg("✅ Pago exitoso. ¡Gracias por tu compra!");
                // 1) limpiar carrito
                localStorage.removeItem("cart");
                // 2) avisar al navbar que cambió el carrito
                window.dispatchEvent(new Event("cartUpdated"));
            } else {
                setMsg(`❌ Pago no completado: ${payload.payment_status}`);
            }
        })();
    }, [searchParams]);

    if (!msg) return <LoadingScreen />;

    const isSuccess = msg.startsWith("✅");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center montserrat">
                <div
                    className={
                        (isSuccess ? "text-green-500" : "text-red-500") +
                        " text-6xl mb-4"
                    }
                >
                    {isSuccess ? "✔️" : "❌"}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                    {msg.replace(/^✅ |^❌ /, "")}
                </h2>
                {isSuccess && (
                    <p className="text-gray-600 mb-6">
                        En unos momentos recibirás un correo de confirmación.
                    </p>
                )}
                <Link
                    to="/"
                    className={
                        (isSuccess
                            ? "bg-[#14489D] hover:bg-blue-700"
                            : "bg-gray-300 hover:bg-gray-400") +
                        " inline-block text-white font-semibold py-3 px-6 rounded-full transition"
                    }
                >
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
};

export default SuccessPaymentView;
