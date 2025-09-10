import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [authChecked, setAuthChecked] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
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
      } catch {
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

  return valid ? children : <Navigate to="/restricted" replace />;
}
