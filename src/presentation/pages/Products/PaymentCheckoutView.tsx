import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "../../../infrastructure/http/clientProvider.ts";
import LoadingScreen from "../../components/LoadingScreen.tsx";

const PaymentCheckoutView: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            if (!cart.length) return navigate("/");

            const item = cart[0];
            const line_items = [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {name: item.title},
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                },
            ];
            const {
                data,
                error
            } = await supabaseClient.functions.invoke("create-checkout-session", {
                body: {
                    buyer_id: (await supabaseClient.auth.getUser()).data.user?.id,
                    laptop_id: item.id,
                    line_items
                }
            });

            if (error) throw error;
            const {sessionUrl} = data as { sessionUrl: string };
            window.location.href = sessionUrl;
        })();
    }, [navigate]);

    return <LoadingScreen />;
};

export default PaymentCheckoutView;
