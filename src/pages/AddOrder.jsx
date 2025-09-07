import { useState } from "react";
import { SearchIcon, BellIcon, CircleUser, Plus } from "lucide-react";
function AddOrder() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");

        try {
            const formData = new FormData();

            const res = await fetch(`{API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, address }),
            });
            if (res.ok) {
                setSuccessMsg("✅ Order was placed successfully!");

                setName("");
                setDescription("");
                setQuantity("");
                setCategory("");
                setPrice("");
                setImage(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                setSuccessMsg("❌ Failed to add product.");
            }
        }
        catch (err) {
            console.error(err);
            setSuccessMsg("❌ Error while adding product.");
        }



    };

    return (
        <div className="ms-64 p-5 flex flex-col min-h-screen">
            <div className="flex justify-between items-center text-gray-800">
                <h1 className="text-3xl font-bold">Orders &gt; Add</h1>
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

            <div className="my-10 flex justify-center items-start">
                <form onSubmit={handleSubmit} className="text-gray-500 w-md rounded-md p-6 bg-white flex flex-col gap-5 items-start">
                    <h2 className="text-xl text-gray-600 font-semibold text-start">Customer details</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0
                         placeholder:font-normal placeholder:text-gray-500 bg-gray-200 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0
                         placeholder:font-normal placeholder:text-gray-500 bg-gray-200 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0
                         placeholder:font-normal placeholder:text-gray-500 bg-gray-200 p-2 w-full"
                    />

                    <div className="w-full">
                        <label className="block mb-1 font-semibold text-start">Payment methods</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="p-2 bg-gray-200 rounded w-full"
                        >
                            <option value="cash">Cash on delivery</option>
                            <option value="card">Card</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Place order
                    </button>
                    {successMsg && (
                        <p className="mt-4 text-lg font-semibold text-green-600">
                            {successMsg}
                        </p>
                    )}
                </form>

                <form onSubmit={handleSubmit} className="text-gray-500 w-md ms-5 rounded-md p-6 bg-white">
                    <h2 className="text-xl text-gray-600 font-semibold text-start">Order details</h2>
                    <div className="bg-gray-200 p-3 rounded-md mt-5 flex flex-col items-center">
                        <span>No items added</span>
                        <button onClick={() => setOpenAddProduct(true)} className="cursor-pointer mt-2 p-1 bg-green-500  rounded-full">
                            <Plus className="text-green-300 rounded-full" />
                        </button>

                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-1 font-semibold text-start">Payment status</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="p-2 bg-gray-200 rounded w-full"
                        >
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>

                        </select>
                    </div>
                    <div className="w-full mt-5">
                        <label className="block mb-1 font-semibold text-start">Order status</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="p-2 bg-gray-200 rounded w-full"
                        >
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="delivered">Delivered</option>
                            <option value="preparing">Preparing</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between">
                            <h3>Subtotal: </h3>
                            <span>0</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <h3>Delivery VAT: </h3>
                            <span>10</span>
                        </div>
                        <div className="flex justify-between text-2xl text-gray-600 font-semibold mt-2">
                            <h3 className="">Total: </h3>
                            <span>0 $</span>
                        </div>
                    </div>
                    {openAddProduct && (
                        <div className="text-gray-800 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-96">
                                <div className="flex">

                                    <div className="text-start ms-5">
                                        <h2 className="text-lg font-bold mb-2">Delete product</h2>
                                        <p className="text-gray-600 mb-4">
                                            Are you sure you want to delete{" "}

                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setOpenAddProduct(false)}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

        </div>
    );
}

export default AddOrder;
