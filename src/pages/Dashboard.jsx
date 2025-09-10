import { SearchIcon, BellIcon, CircleUser } from "lucide-react";
import Sidebar from "../components/SidebarNav";
export default function Dashboard() {
    return (
        <div>
            <Sidebar />
            <div className="ms-64 p-5 flex-1 flex justify-between items-center text-gray-800">
                <h1 className="text-3xl font-bold">Dashboard</h1>
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
            <div>
                <div>
                    
                </div>
            </div>
        </div>

    );
}