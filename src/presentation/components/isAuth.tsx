import { authServerApi } from "../../infrastructure/http/features/authServerApi.ts";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const IsAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const userId = await authServerApi.getUserId();
            if (!userId) {
                navigate("/login");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return null; // o spinner

    return <Outlet />;
};
