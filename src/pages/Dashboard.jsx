import { SearchIcon, BellIcon, CircleUser, DollarSign, Book } from "lucide-react";
import Sidebar from "../components/SidebarNav";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState([]);
    const token = localStorage.getItem("token");
    const [error, setError] = useState(null);
    const [ordersCount, setOrdersCount] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [averageOrderValue, setAverageOrderValue] = useState(null);
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch(`${API_URL}/analytics`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Error fetching dashboard");

                const data = await res.json();
                setOrdersCount(data.ordersCount);
                setRevenue(data.revenue);
                setAverageOrderValue(data.averageOrderValue);
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
        <div className="text-gray-700">
            <Sidebar />
            <div className="ms-64 p-5 flex-1">
                <div className="flex justify-between items-center">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
                    <div className="bg-white h-40  font-semibold p-5 flex justify-between rounded-xl">
                        <Book className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                        <div className="flex flex-col justify-between items-end">
                            <div className="text-4xl">{ordersCount}</div>
                            <div className="flex flex-col items-end">
                                <div>Total Orders</div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                        <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                        <div className="flex flex-col justify-between items-end">
                            <div className="text-4xl">${revenue}</div>
                            <div className="flex flex-col items-end">
                                <div>Total Revenue</div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                        <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                        <div className="flex flex-col justify-between items-end">
                            <div className="text-4xl">${averageOrderValue}</div>
                            <div className="flex flex-col items-end">
                                <div>Average order value</div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                        <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                        <div className="flex flex-col justify-between items-end">
                            <div className="text-4xl">100</div>
                            <div className="flex flex-col items-end">
                                <div>Total customers (TBI)</div>
                            </div>
                        </div>

                    </div>
                </div>
                

            </div>

        </div>

    );
}