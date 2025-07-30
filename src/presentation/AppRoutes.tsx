import React from 'react';
import {Navigate, type RouteObject, useRoutes} from 'react-router-dom';
import {HomeRoutes} from "./pages/Home/HomeRoutes.tsx";
import {AuthRoutes} from "./pages/Auth/AuthRoutes.tsx";
import {Layout} from "./layout/Layout.tsx";
import HomeView from './pages/Home/HomeView.tsx';
import {CartRoutes} from "./pages/Cart/CartRoutes.tsx";
import {ProductsRoutes} from "./pages/Products/ProductsRoutes.tsx";
import {DashboardRoutes} from "./pages/Dashboard/DashboardRoutes.tsx";
import ProductsView from './pages/Products/ProductsView.tsx';
import {IsSeller} from "./components/isSeller.tsx";


const AppRoutes: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element:<Layout/>,
            children: [
                ...HomeRoutes,
                ...ProductsRoutes,
                ...CartRoutes,
                {
                    element: <IsSeller/>,
                    children: [
                        ...DashboardRoutes,
                    ],
                },
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
            element:<ProductsView/>
        }
    ];

    return useRoutes(routes);
};

export default AppRoutes;