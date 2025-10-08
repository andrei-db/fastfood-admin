import { SearchIcon, BellIcon, ChevronDown } from "lucide-react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { UserContext } from "../context/UserContext.jsx";
export default function Navbar({ pageName }) {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="relative bg-white px-5 py-3 shadow-xs flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <h1 className="text-4xl font-extrabold text-green-800">
                        FRESH<span className="text-red-500">FOOD</span>
                    </h1>
                </div>
                {/* <h1 className="text-xl font-bold">{pageName}</h1> */}
                <div className="flex items-center gap-6">
                    <div className="bg-gray-100 flex p-2 rounded-md">
                        <SearchIcon />
                        <input className="ms-2" type="text" placeholder="Search ..." />
                    </div>
                    <div>
                        <BellIcon />
                    </div>
                    <div onClick={() => setOpen((prev) => !prev)}
                        className="hover:bg-gray-200 cursor-pointer transition ease-in-out
                    flex gap-4 items-center border border-transparent border-s-gray-400 ps-5">
                        <img className="rounded-full w-12 h-12 object-cover" src={user?.profilePic} />
                        <div className="">
                            <div className="text-xl">{user?.username}</div>
                            <div>{user?.role}</div>
                        </div>
                        <div><ChevronDown /></div>
                    </div>
                </div>

            </div>
            {open && (
                <div className="absolute right-5 w-60 border border-gray-200 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link to="/profile"
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                        Profile
                    </Link>

                    <LogoutButton

                    />

                </div>
            )}
        </div>

    )
}