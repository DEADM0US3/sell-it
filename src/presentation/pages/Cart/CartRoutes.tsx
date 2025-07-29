import type {RouteObject} from "react-router-dom";
import CartView from "./CartView.tsx";


export const CartRoutes: RouteObject[] = [
    {
        path: "cart",
        children:[
            {
                index: true,
                element: <CartView/>
            }
        ]
    }
]