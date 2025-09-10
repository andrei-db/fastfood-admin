import { SearchIcon, BellIcon, CircleUser } from "lucide-react";
import Sidebar from "../components/SidebarNav";
import { useEffect, useState } from "react";
export default function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState([]);
    const token = localStorage.getItem("token");
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    window.location.href = "/restricted";
                    return;
                }

                if (!res.ok) throw new Error("Error fetching dashboard");

                const data = await res.json();
                setDashboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [API_URL, token]);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                <p>Loading dashboard...</p>
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
        <div>
            <Sidebar />
            <div className="ms-64 p-5 flex-1 flex justify-between items-center text-gray-800">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-6">
                    <div className="bg-white flex p-2 rounded-md">
                        <SearchIcon />
                        <input className="ms-2" type="text" placeholder="Search ..." />
                    </div>
                    <div>
                        <BellIcon />
                    </div>
                    <div>
                        <CircleUser />
                    </div>
                </div>
            </div>
            <div>
                <div>

                </div>
            </div>
        </div>

    );
}