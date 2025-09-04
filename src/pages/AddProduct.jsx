import { useState, useRef } from "react";
import { SearchIcon, BellIcon, CircleUser } from "lucide-react";
function AddProduct() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");

        try {
            const formData = new FormData();
            formData.append("image", image);

            const uploadRes = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const { url } = await uploadRes.json();

            const res = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, quantity, category, price, image: url }),
            });
            if (res.ok) {
                setSuccessMsg("✅ Product added successfully!");

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
                <h1 className="text-3xl font-bold">Products &gt; Add</h1>
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
