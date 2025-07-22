import { FaUsersGear } from "react-icons/fa6";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import LogoutButton from "../Utils/logout";

export default function Topbar() {
    const basecss = "cursor-pointer text 2xl";
    return (
        <div className="flex justify-between">
            <div className="flex items-center p-2 gap-2.5">
                <FaUsersGear className="cursor-pointer text-2xl"/>
                <h1 className="text-3xl text-black font-bold">HRMS Portal</h1>
            </div>
            <div className="flex items-center justify-between text-1xl gap-6 mr-4 hover:text-green-700">
                <FaSearch className={'${basecss}'} />
                <FaBell className={'${basecss}'} />
                <FaUser className={'${basecss}'} />
                <LogoutButton className={'${basecss}'} />
            </div>
        </div>
    )
}