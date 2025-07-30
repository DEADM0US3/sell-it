import type {RouteObject} from "react-router-dom";
import ListProductsView from "./ListProductsView.tsx";
import ProductsView from "./ProductsView.tsx";
import PaymentCheckoutView from "./PaymentCheckoutView.tsx";
import SuccessPaymentView from "./SucessPaymentView.tsx";

export const ProductsRoutes: RouteObject[] = [
    {
        path: "products",
        children:[
            {
                index: true,
                element: <ListProductsView/>
            },
            {
                path: ":id",
                element: <ProductsView/>
            },
            {
                path: "checkout",
                element: <PaymentCheckoutView />
            },
            {
                path: "checkout/success",
                element: <SuccessPaymentView />
            }
        ]
    }
]