import {useNavigate} from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
       
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className=" bg-blue-400 text-white px-2 py-2 rounded hover:bg-blue-400 transition duration-300">
            Logout
        </button>
    );

}