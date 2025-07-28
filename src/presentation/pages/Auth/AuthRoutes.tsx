import type {RouteObject} from "react-router-dom";
import LoginView from "./LoginView.tsx";
import RegisterView from "./RegisterView.tsx";


export const AuthRoutes: RouteObject[] = [
    {
        path: "",
        children:[
            {
                path: "login",
                element: <LoginView/>
            },
            {
                path: "register",
                element: <RegisterView/>
            }
        ]
    }
]