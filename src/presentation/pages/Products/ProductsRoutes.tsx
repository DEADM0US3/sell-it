import type {RouteObject} from "react-router-dom";
import ListProductsView from "./ListProductsView.tsx";
import ProductsView from "./ProductsView.tsx";

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
            }
        ]
    }
]