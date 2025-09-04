import { NavLink } from "react-router-dom";
import { Hamburger, LayoutDashboard, Settings} from "lucide-react";
export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-white text-black shadow-lg">
      <div className="flex justify-center items-center py-5">
        <h1 className="text-4xl font-extrabold text-green-800">
          FRESH<span className="text-red-500">FOOD</span>
        </h1>
      </div>

      <div className="flex flex-col px-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex px-3 py-2 rounded-lg transition my-2 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
            <LayoutDashboard className="me-3"/>
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex px-3 py-2 rounded-lg transition  my-2 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
            <Hamburger className="me-3"/>
          Products
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex px-3 py-2 rounded-lg transition my-2 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
            <Settings className="me-3" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
