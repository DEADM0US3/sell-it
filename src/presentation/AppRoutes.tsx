import React from 'react';
import {Navigate, type RouteObject, useRoutes} from 'react-router-dom';
import {HomeRoutes} from "./pages/Home/HomeRoutes.tsx";
// import {IsAuth} from "./components/isAuth.tsx";
import {AuthRoutes} from "./pages/Auth/AuthRoutes.tsx";
import {Layout} from "./layout/Layout.tsx";
import { CardDetail } from './layout/components/CardDetails.tsx';
import HomeView from './pages/Home/HomeView.tsx';


const AppRoutes: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            children: [
                ...HomeRoutes,
            ],
        },
        ...AuthRoutes,
        {
            path: 'not-found',
            element: <h1>Not Found</h1>,
        },
        {
            path:'/home',
            element:<HomeView/>       
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
        {
            path:'/details',
            element:<CardDetail/>
        }
    ];

    return useRoutes(routes);
};

export default AppRoutes;