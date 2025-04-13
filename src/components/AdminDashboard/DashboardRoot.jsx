import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";


const DashboardRoot = () => {
    return (
        <div>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </div>
    );
};

export default DashboardRoot;