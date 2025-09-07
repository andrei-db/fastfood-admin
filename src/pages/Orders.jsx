import { SearchIcon, BellIcon, CircleUser, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";




export default function Orders() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const statusStyles = {
        pending: {
            label: "Pending",
            color: "bg-gray-100 text-gray-800"
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
        fetch("http://localhost:5000/orders")
            .then((res) => {
                if (!res.ok) throw new Error("Fetch orders error");
                return res.json();
            })
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="ms-64 p-5 flex flex-col min-h-screen text-gray-800">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
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
                    to="/products/add"
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
                            <tr key={o._id}>
                                <td className="border-b border-gray-200 py-2">{o._id}</td>
                                <td className="border-b border-gray-200">
                                    {new Date(o.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</td>
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
    );
}
