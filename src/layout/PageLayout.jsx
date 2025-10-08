import Navbar from "../components/Navbar";
import SidebarNav from "../components/SidebarNav";

export default function PageLayout({ children }) {
  return (
    <div className="text-gray-700">
      <SidebarNav />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}