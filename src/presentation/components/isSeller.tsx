import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {userServerApi} from "../../infrastructure/http/features/userServerApi.ts";
import LoadingScreen from "./LoadingScreen.tsx";

export const IsSeller = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {

            const userId = await userServerApi.getRole();
            if (!userId || userId !== "seller") {
                navigate("/");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return <LoadingScreen/>; // o spinner

    return <Outlet />;
};
