import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-70 h-screen bg-white text-black shadow-lg">
      <div className="flex justify-center items-center py-5">
        <h1 className="text-4xl font-extrabold text-green-800">
          FRESH<span className="text-red-500"> FOOD</span>
        </h1>
      </div>

      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition mx-10 my-2 ${
              isActive
                ? "bg-red-500 text-white" // active styles
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition mx-10 my-2 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition mx-10 my-2 ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}
