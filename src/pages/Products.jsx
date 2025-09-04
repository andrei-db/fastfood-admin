import { SearchIcon, BellIcon, CircleUser, Plus, Trash2, CircleAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => {
                if (!res.ok) throw new Error("Fetch products error");
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="ms-64 p-5 flex flex-col min-h-screen">
            <div className="flex justify-between items-center text-gray-800">
                <h1 className="text-3xl font-bold">Products</h1>
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
            <div className="flex justify-end my-5">
                <Link to="/products/add" className="flex bg-red-500 hover:bg-red-600 p-2 text-white rounded-md font-semibold">
                    <Plus />
                    Add new product
                </Link>
            </div>
            <div className="rounded-md bg-white h-140 overflow-hidden">
                <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 items-start">
                    {products.map((p) => (
                        <div key={p._id} className="relative bg-gray-100 rounded-xl overflow-hidden
                         hover:bg-gray-300 transition ease-and-out duration-300">
                            <Link to={`/products/${p._id}`}>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="absolute top-0 right-0 m-3 bg-red-500 hover:bg-red-600 rounded-sm p-1 text-white z-50"
                                >
                                    <Trash2 />
                                </button>
                                <div
                                    className={`text-gray-800 fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                                        }`}
                                >
                                    <div
                                        className="absolute inset-0 bg-black/30"
                                        onClick={() => setOpen(false)}
                                    />
                                    <div
                                        className={`relative bg-white rounded-lg shadow-xl p-6 z-10 transform transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                            }`}
                                    >
                                        <div className="flex">
                                            <div>
                                                <CircleAlert className="w-10 h-10 text-red-500" />
                                            </div>
                                            <div className="text-start ms-5">
                                                <h2 className="text-lg font-bold mb-2">Delete product</h2>
                                                <p className="text-gray-600 mb-4">
                                                    Are you sure you want to delete this product?
                                                </p>
                                            </div>

                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const res = await fetch(`http://localhost:5000/products/${p._id}`, {
                                                            method: "DELETE",
                                                        });

                                                        if (!res.ok) {
                                                            throw new Error("Failed to delete product");
                                                        }

                                                        setProducts((prev) => prev.filter((pr) => pr._id !== p._id));

                                                        setOpen(false);
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert("Error deleting product");
                                                    }
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <img className="hover:rotate-10  transition duration-300 ease-in-out" src={p.image} />
                                <h2 className="italic text-gray-600 text-xl font-semibold mb-3">{p.name}</h2>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}