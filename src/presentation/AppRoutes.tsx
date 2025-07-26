import React from 'react';
import {Navigate, type RouteObject, useRoutes} from 'react-router-dom';

import {HomeRoutes} from "./pages/Home/HomeRoutes.tsx";
import {IsAuth} from "./components/isAuth.tsx";
import {AuthRoutes} from "./pages/Auth/AuthRoutes.tsx";


const AppRoutes: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <IsAuth/>,
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
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ];

    return useRoutes(routes);
};

export default AppRoutes;