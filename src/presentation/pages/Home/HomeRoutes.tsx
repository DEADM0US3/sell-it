import type {RouteObject} from "react-router-dom";
import HomeView from "./HomeView.tsx";


export const HomeRoutes: RouteObject[] = [
    {
        path: "/",
        children:[
            {
                index: true,
                element: <HomeView/>
            }
        ]
    }
]