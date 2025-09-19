import { LogOutIcon } from "lucide-react";
export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div onClick={handleLogout}
        className="flex items-center gap-2 w-full px-4 py-2 text-left">
      <LogOutIcon />
      <button
        
      >
        Logout
      </button>
    </div>

  );
}
