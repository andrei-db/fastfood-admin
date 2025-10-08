import { SearchIcon, BellIcon, CircleUser } from "lucide-react";
import Sidebar from "../components/SidebarNav";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
export default function Settings() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState([]);
    const token = localStorage.getItem("token");
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/settings`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    window.location.href = "/restricted";
                    return;
                }

                if (!res.ok) throw new Error("Error fetching settings");

                const data = await res.json();
                setSettings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [API_URL, token]);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                <p>Loading settings...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }
    return (
        <div className="text-gray-700">
            <div className="ms-64 flex flex-col min-h-screen">
               
            </div>
        </div>

    );
}