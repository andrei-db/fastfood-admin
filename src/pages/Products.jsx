import { SearchIcon, BellIcon, CircleUser, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 items-start">
                {products.map((p)=>(
                    <div key={p._id} className="bg-gray-100 rounded-xl overflow-hidden cursor-pointer">
                        <img className="hover:rotate-10  transition duration-300 ease-in-out" src={p.image}/>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}