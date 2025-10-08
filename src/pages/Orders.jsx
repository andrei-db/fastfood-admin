import { SearchIcon, BellIcon, CircleUser, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/SidebarNav";
import Navbar from "../components/Navbar";
function formatOrderDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) return `Today, ${time}`;
    if (isYesterday) return `Yesterday, ${time}`;

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }) + `, ${time}`;
}
export default function Orders() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const statusStyles = {
        pending: {
            label: "Pending",
            color: "bg-gray-200 text-gray-800"
        },
        preparing: {
            label: "Preparing",
            color: "bg-blue-100 text-blue-800"
        },
        ready: {
            label: "Ready",
            color: "bg-green-100 text-green-800"
        },
        delivered: {
            label: "Delivered",
            color: "bg-green-100 text-green-800"
        },
        canceled: {
            label: "Canceled",
            color: "bg-red-100 text-red-800"
        }
    }
    function StatusBadge({ status }) {
        const style = statusStyles[status] || statusStyles.pending;

        return (
            <span className={`px-3 py-1 rounded-md text-xs ${style.color}`}>
                {style.icon} {style.label}
            </span>
        );
    }
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/admin`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    window.location.href = "/restricted";
                    return;
                }

                if (!res.ok) throw new Error("Error fetching orders");

                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [API_URL, token]);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                <p>Loading orders...</p>
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
            <div className="ms-64 flex flex-col min-h-screen text-gray-800">
                <div className="p-5">
                    <div className="flex justify-end mb-5">
                        <Link
                            to="/orders/add"
                            className="flex bg-red-500 hover:bg-red-600 p-2 text-white rounded-md font-semibold"
                        >
                            <Plus />
                            Add new order
                        </Link>
                    </div>

                    <div className="rounded-md bg-white h-[750px] overflow-y-auto text-xs overflow-hidden">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-white">
                                <tr>
                                    <th className="text-start p-4">Nr.</th>
                                    <th className="text-start p-4">Order ID</th>
                                    <th className="text-start">Date</th>
                                    <th className="text-start">Customer</th>
                                    <th className="text-start">Total</th>
                                    <th className="text-start">Status</th>
                                    <th className="text-start">Items</th>
                                </tr>
                            </thead>
                            <tbody className="text-start">
                                {orders.map((o, k) => (
                                    <tr key={o._id} className="cursor-pointer hover:bg-gray-100 transition ease-and-out">
                                        <td className="border-b border-gray-200 px-4 py-3">{k + 1}</td>
                                        <td className="border-b border-gray-200 px-4 py-3">{o._id}</td>
                                        <td className="border-b border-gray-200">
                                            {
                                                formatOrderDate(o.createdAt)
                                            }</td>
                                        <td className="border-b border-gray-200">{o.name} $</td>
                                        <td className="border-b border-gray-200">{o.total} $</td>
                                        <td className="border-b border-gray-200"><StatusBadge status={o.status} /></td>
                                        <td className="border-b border-gray-200">{o.items.length} {o.items.length > 1 ? 'items' : 'item'}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
