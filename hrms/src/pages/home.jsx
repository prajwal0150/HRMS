import Sidebar from "../component/home/sidebar";
import Topbar from "../component/home/topbar";
import { Outlet } from "react-router-dom";
import img from '../assets/pexels-mikhail-nilov-6893376.jpg';
export default function Home() {
    return (
        <>
            <img src={img} className="absolute inset-0 object-cover w-full h-full -z-10" alt="Background" />
            <div className="bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <title>HRMS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Topbar />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 overflow-y-auto p-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}