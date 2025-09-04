import { SearchIcon, BellIcon, CircleUser, EditIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
export default function EditProduct() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setConfirmModalOpen] = useState(false);
    const { id } = useParams();
    const [file, setFile] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
                setImage(data.image);
                setDescription(data.description);
                setPrice(data.price);
                setCategory(data.category);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = image;

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            const uploadRes = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const { url } = await uploadRes.json();
            imageUrl = url;
        }

        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                description,
                price,
                category,
                image: imageUrl,
            }),
        });

        if (res.ok) {
            setConfirmModalOpen(true);
        }
    };
    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            setImage(URL.createObjectURL(f));
        }
    };
    if (loading) return <p>Loading...</p>;
    return (
        <div className="ms-64 p-5 flex flex-col min-h-screen">
            <div className="flex justify-between items-center text-gray-800">
                <h1 className="text-3xl font-bold">Products &gt; Edit Product</h1>
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

            <div className="my-10 mx-auto">
                <div className="grid grid-cols-2 bg-white rounded-md">
                    <div className="relative p-10">
                        <button className="flex items-center absolute top-0 left-0 rounded-md px-2 py-1
                         text-xs ms-2 mt-2  text-gray-800 bg-gray-300 cursor-pointer hover:bg-gray-400">
                            <EditIcon className="w-3 h-3 me-2" />
                            <label htmlFor="fileInput">Edit image</label>
                            <input id="fileInput" className="hidden w-50" type="file" accept="image/*" onChange={handleFileChange} />
                        </button>

                        <img src={image} className="w-xs h-auto" />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="text-gray-500 rounded-md p-6  flex flex-col gap-5 items-start">
                            <div className="flex flex-col w-full">
                                <label className="text-start bg-white">Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="rounded-sm bg-gray-300 font-semibold text-gray-700  outline-0
                         placeholder:font-normal placeholder:text-gray-500  p-2 w-full"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-start bg-white">Description</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="rounded-sm bg-gray-300 font-semibold text-gray-700  outline-0
                         placeholder:font-normal placeholder:text-gray-500  p-2 w-full"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-start bg-white">Category</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="rounded-sm bg-gray-300 font-semibold text-gray-700  outline-0
                         placeholder:font-normal placeholder:text-gray-500  p-2 w-full"
                                />
                            </div>
                            <input type="text"
                                value={image}
                                className="hidden"
                            />
                            <div className="flex flex-col w-full">
                                <label className="text-start bg-white">Price</label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="rounded-sm bg-gray-300 font-semibold text-gray-700  outline-0
                         placeholder:font-normal placeholder:text-gray-500  p-2 w-full"
                                />
                            </div>
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                                Save changes
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <ConfirmModal
                open={open}
                title="✅ Product updated"
                message="The product was updated successfully."
                onCancel={() => setConfirmModalOpen(false)}
            />
        </div>
    );
}