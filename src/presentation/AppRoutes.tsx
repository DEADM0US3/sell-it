import React from 'react';
import {Navigate, type RouteObject, useRoutes} from 'react-router-dom';
import {HomeRoutes} from "./pages/Home/HomeRoutes.tsx";
import {AuthRoutes} from "./pages/Auth/AuthRoutes.tsx";
import {Layout} from "./layout/Layout.tsx";
import { CardDetail } from './components/CardDetails.tsx';
import HomeView from './pages/Home/HomeView.tsx';
import {CartRoutes} from "./pages/Cart/CartRoutes.tsx";
import {ProductsRoutes} from "./pages/Products/ProductsRoutes.tsx";


const AppRoutes: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element:<Layout/>,
            children: [
                ...HomeRoutes,
                ...ProductsRoutes,
                ...CartRoutes
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