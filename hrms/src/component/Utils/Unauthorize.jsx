import { FaLock } from "react-icons/fa";


export default function Unauthorize() {
    return(
        <div className="flex flex-col items-center justify-center h-screen text-red-600 text-x1 space-y-4">
        <FaLock className="text-6xl" />
        <p>Access Denied. You are not authorized to view this page.</p>
        </div>
    )
}