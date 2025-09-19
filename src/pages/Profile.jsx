import SidebarNav from "../components/SidebarNav";
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../context/UserContext";
export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [originalUser, setOriginalUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                profilePic: data.profilePic || "",
                password: "",
            });
            setOriginalUser(data);
        };

        fetchUser();
    }, [API_URL, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updates = {};
        for (const key in formData) {
            if (formData[key] !== originalUser[key] && formData[key] !== "") {
                updates[key] = formData[key];
            }
        }

        if (Object.keys(updates).length === 0) return;

        try {
            const res = await fetch(`${API_URL}/users`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });

            if (!res.ok) throw new Error("Update failed");

            const updated = await res.json();
            setOriginalUser(updated);
            setUser(updated);
            localStorage.setItem("user", JSON.stringify(updated));
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const fileInputRef = useRef(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploadingImage(true);
            const uploadRes = await fetch(`${API_URL}/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const { url } = await uploadRes.json();

            setFormData((prev) => ({ ...prev, profilePic: url }));
        } catch (err) {
            console.error("Upload failed:", err);
        }
        finally {
            setUploadingImage(false);
        }
    };



    return (
        <div className="text-gray-700">
            <SidebarNav />
            <div className="ms-64 flex flex-col">
                <Navbar pageName="Profile" />
                <div className="flex items-start gap-5 p-5">
                    <div className="w-128 bg-gray-50 rounded-xl">
                        <div className="my-5">
                            <div>Link</div>
                            <div>Link</div>
                            <div>Link</div>
                            <div>Link</div>
                        </div>
                    </div>
                    <div className="p-10 bg-gray-50 rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center border-b-gray-500">
                                <div className="text-start">
                                    <h2 className="font-semibold text-xl">Username</h2>
                                </div>
                                <div className="text-start col-span-3 flex p-5 rounded-xl">

                                    <div className="flex flex-col">
                                        <input value={formData.username} className="shadow-xs bg-gray-100 rounded-md py-2 px-4" type="" disabled placeholder={user.username} />
                                    </div>

                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-4 items-center border-b-gray-500">
                                <div className="text-start">
                                    <h2 className="font-semibold text-xl">Profile picture</h2>
                                    <p>This photo will be displayed on your profile.</p>
                                </div>
                                <div className="text-start col-span-3 flex flex-1 justify-between items-center py-5 lg:px-10 rounded-xl">
                                    <div>
                                        <img
                                            className="shadow rounded-full w-24 h-24 object-cover"
                                            src={formData.profilePic || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="flex gap-5">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />

                                        <button
                                            type="button"

                                            className={`${uploadingImage ? "bg-gray-500" : "bg-red-500"} py-2 px-4 text-white rounded-md`}
                                            onClick={() => fileInputRef.current.click()}
                                            disabled={uploadingImage}
                                        >
                                            {uploadingImage ? "Uploading..." : "Upload"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center border-b-gray-500">
                                <div className="text-start">
                                    <h2 className="font-semibold text-xl">Full name</h2>
                                </div>
                                <div className="text-start col-span-3 flex gap-5 items-center py-5 xl:px-5 rounded-xl">
                                    <div className=" flex flex-col">
                                        <input value={formData.firstName} name="firstName" onChange={handleChange} className="w-full shadow-xs bg-white rounded-md py-2 px-4" type="text" placeholder="First name" />
                                    </div>
                                    <div className="flex flex-col">
                                        <input value={formData.lastName} name="lastName" onChange={handleChange} className="w-full shadow-xs bg-white rounded-md py-2 px-4" type="text" placeholder="Last name" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center border-b-gray-500">
                                <div className="text-start">
                                    <h2 className="font-semibold text-xl">Email</h2>
                                </div>
                                <div className="text-start col-span-3 flex gap-5 items-center lg:p-5 rounded-xl">

                                    <div className="flex flex-col">
                                        <input value={formData.email} name="email" onChange={handleChange} className="shadow-xs bg-white rounded-md py-2 px-4" type="text" placeholder="Email address" />
                                    </div>

                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-4 items-center border-b-gray-500">
                                <div className="text-start">
                                    <h2 className="font-semibold text-xl">Password</h2>
                                    <p>Modify your current password</p>
                                </div>
                                <div className="text-start col-span-3 flex gap-5 items-center lg:p-5 rounded-xl">
                                    <div className="flex flex-col">
                                        <label className="text-sm">New password</label>
                                        <input value={formData.password} onChange={handleChange} className="mt-1 shadow-xs bg-white rounded-md py-2 px-4 w-full" type="password" name="password" placeholder="***********" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded-md">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}