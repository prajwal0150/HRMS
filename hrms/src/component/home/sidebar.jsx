import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md border-r p-4">
      <nav className="flex flex-col gap-4 text-gray-400 hover:text-black ">
        <SidebarItems
          icon={<FiHome />}
          label="Dashboard"
          to="/home/dashboard"
        ></SidebarItems>
        <SidebarItems
          icon={<FiUsers />}
          label="Employee"
          to="/home/employee"
        ></SidebarItems>
        <SidebarItems
          icon={<FiCalendar />}
          label="Attendance"
          to="/home/attendance"
        ></SidebarItems>
        <SidebarItems
          icon={<FiDollarSign />}
          label="Payroll"
          to="/home/payroll"
        ></SidebarItems>
        <SidebarItems
          icon={<FiSettings />}
          label="User Management"
           to="/home/setting"
        ></SidebarItems>
      </nav>
    </div>
  );
}
const SidebarItems = ({ icon, label, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const baseclass = "flex items-center gap-2 py-2 px-2 text-black";
    const activeClass = isActive ? "bg-black text-white rounder ": "bg-non";
    return (
        to ? (
            <Link to={to} className={`${baseclass} ${activeClass}`}>
                <span className="text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
            </Link>
        ) : null
    );
}