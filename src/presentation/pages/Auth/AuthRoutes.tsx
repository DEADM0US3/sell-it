import type {RouteObject} from "react-router-dom";
import LoginView from "./LoginView.tsx";


export const AuthRoutes: RouteObject[] = [
    {
        path: "",
        children:[
            {
                path: "/login",
                element: <LoginView/>
            }
        ]
    }
]