import type {RouteObject} from "react-router-dom";
import DashboardView from "./DashboardView.tsx";

export const DashboardRoutes: RouteObject[] = [
    {
        path: "dashboard",
        children:[
            {
                index: true,
                element: <DashboardView/>
            }
        ]
    }
]