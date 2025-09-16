import { SearchIcon, BellIcon, CircleUser, Plus, Trash2, CircleAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/SidebarNav";

export default function Products() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/restricted";
          return;
        }

        if (!res.ok) throw new Error("Error fetching products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL, token]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        <p>Loading products...</p>
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

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`${API_URL}/products/${productToDelete._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/restricted"; // sau /login
        return;
      }

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="ms-64 p-5 flex flex-col min-h-screen">
        <div className="flex justify-between items-center text-gray-800">
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
            <Plus className="mr-1" />
            Add new product
          </Link>
        </div>

        <div className="rounded-md bg-white max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 items-start">
            {products.map((p) => (
              <div
                key={p._id}
                className="relative bg-gray-100 rounded-xl overflow-hidden hover:bg-gray-300 transition ease-in-out duration-300"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setProductToDelete(p);
                    setOpen(true);
                  }}
                  className="absolute top-0 right-0 m-3 bg-red-500 hover:bg-red-600 rounded-sm p-1 text-white z-50"
                >
                  <Trash2 />
                </button>

                <Link to={`/products/${p._id}`}>
                  <img
                    className="hover:rotate-5 transition duration-300 ease-in-out w-full object-cover"
                    src={p.image}
                    alt={p.name}
                  />
                  <div className="flex justify-between px-5">
                    <h2 className="italic text-gray-600 text-xl font-semibold mb-3 p-2">
                      {p.name}
                    </h2>
                    <span className="text-gray-700 text-2xl font-bold mb-3 p-2">
                      ${p.price}
                    </span>
                  </div>

                </Link>
              </div>
            ))}
          </div>
        </div>

        {open && (
          <div className="text-gray-800 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 z-10 w-96">
              <div className="flex">
                <CircleAlert className="w-10 h-10 text-red-500" />
                <div className="text-start ms-5">
                  <h2 className="text-lg font-bold mb-2">Delete product</h2>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{productToDelete?.name}</span>?
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
