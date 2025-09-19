import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                setError("Invalid credentials");
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Server error");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl w-md p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    <span className="text-green-600">FRESH</span>
                    <span className="text-red-500">FOOD</span>
                </h1>

                <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="you@example.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    Forgot your password?{" "}
                    <a href="#" className="text-red-500 hover:underline">
                        Reset here
                    </a>
                </p>
            </div>
        </div>
    );
}
