import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import {AppContext} from "../context/AppContext.jsx";
import {useContext} from "react";

const Dashboard = ({children, activeMenu}) => {
    const {user} = useContext(AppContext);
    return (
        <div>
            <Menubar activeMenu={activeMenu}/>

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>

                    <div className="grow mx-5 bg-purple-50 min-h-screen">{children}</div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
