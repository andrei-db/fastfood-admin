import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [authChecked, setAuthChecked] = useState(false);
    const [valid, setValid] = useState(false);
    const [status, setStatus] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setStatus(401);
                setAuthChecked(true);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/validate`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    setValid(true);
                } else {
                    localStorage.removeItem("token");
                }
                setStatus(res.status);
            } catch {
                setStatus(401);
                localStorage.removeItem("token");
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [API_URL, token]);

    if (!authChecked) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (status === 401) {
        return <Navigate to="/login" replace />;
    }

    if (status === 403) {
        return <Navigate to="/restricted" replace />;
    }

    return children;
}
