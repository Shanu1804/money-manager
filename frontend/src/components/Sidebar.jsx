import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-8">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="profile"
                        className="w-20 h-20 rounded-full object-cover bg-slate-200"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                )}
                <h5 className="text-gray-950 font-medium text-center">
                    {user?.fullName || "User"}
                </h5>
            </div>

            {/* Menu Items */}
            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    onClick={() => navigate(item.path)}
                    className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu === item.label ? "text-white bg-purple-800": ""}`}>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default Sidebar;