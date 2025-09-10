import {NavLink } from "react-router-dom";
function Restricted() {
    return (
        <div className="text-gray-800 flex flex-col justify-center items-center w-screen h-screen">
            <h1 className="text-6xl mb-10">⚠️ Access Restricted</h1>
            <p className="text-4xl mb-10"> You do not have permission to view this page.</p>
            <NavLink to="/login" className="text-3xl bg-red-500 px-5 py-3 text-white rounded-md">Login</NavLink>
          

        </div>
    );
}

export default Restricted;
