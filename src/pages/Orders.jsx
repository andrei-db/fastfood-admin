import { SearchIcon, BellIcon, CircleUser, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/SidebarNav";
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
            color: "bg-gray-100 text-gray-800"
        },
        cancelled: {
            label: "Cancelled",
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
        fetch(`${API_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Fetch orders error");
                return res.json();
            })
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Sidebar />
            <div className="ms-64 p-5 flex flex-col min-h-screen text-gray-800">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Orders</h1>
                    <div className="flex items-center gap-6">
                        <div className="bg-white flex p-2 rounded-md">
                            <SearchIcon />
                            <input className="ms-2" type="text" placeholder="Search ..." />
                        </div>
                        <BellIcon />
                        <CircleUser />
                    </div>
                </div>

                <div className="flex justify-end my-5">
                    <Link
                        to="/orders/add"
                        className="flex bg-red-500 hover:bg-red-600 p-2 text-white rounded-md font-semibold"
                    >
                        <Plus />
                        Add new order
                    </Link>
                </div>

                <div className="rounded-md bg-white h-140 overflow-y-auto p-4 text-xs">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start">Order</th>
                                <th className="text-start">Date</th>
                                <th className="text-start">Customer</th>
                                <th className="text-start">Total</th>
                                <th className="text-start">Status</th>
                                <th className="text-start">Items</th>
                            </tr>
                        </thead>
                        <tbody className="text-start">
                            {orders.map((o) => (
                                <tr key={o._id} className="cursor-pointer hover:bg-gray-100 transition ease-and-out">
                                    <td className="border-b border-gray-200 py-2">{o._id}</td>
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
        </>
    );
}
