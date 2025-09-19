import { useState, useRef } from "react";
import { SearchIcon, BellIcon, CircleUser } from "lucide-react";
import SidebarNav from "../components/SidebarNav";
import Navbar from "../components/Navbar";
function AddProduct() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const fileInputRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");

        try {
            const formData = new FormData();
            formData.append("image", image);

            const uploadRes = await fetch(`${API_URL}/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const { url } = await uploadRes.json();

            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, quantity, category, price, image: url }),
            });
            if (res.ok) {
                setSuccessMsg("Product added successfully!");

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
                setSuccessMsg("Failed to add product.");
            }
        }
        catch (err) {
            console.error(err);
            setSuccessMsg("Error while adding product.");
        }



    };

    return (
        <div className="text-gray-700 ms-64 flex flex-col">
            <SidebarNav />
            <Navbar pageName="Add product"/>

            <div className="my-10">
                <form onSubmit={handleSubmit} className="text-gray-500 w-md mx-auto rounded-md p-6 bg-white flex flex-col gap-5 items-center">
                    <h2 className="text-2xl text-gray-600 font-semibold">Add a new product</h2>
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
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0
                         placeholder:font-normal placeholder:text-gray-500 bg-gray-200 p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0
                         placeholder:font-normal placeholder:text-gray-500 bg-gray-200 p-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="font-semibold text-gray-700 rounded-sm outline-0 bg-gray-200 placeholder:font-normal
                         placeholder:text-gray-500 p-2 w-full"
                    />

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        ref={fileInputRef}
                        className="rounded-sm bg-gray-500 text-gray-100 border p-2 w-full"
                    />

                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Add product
                    </button>
                    {successMsg && (
                        <p className="mt-4 text-lg font-semibold text-green-600">
                            {successMsg}
                        </p>
                    )}
                </form>
            </div>

        </div>
    );
}

export default AddProduct;
