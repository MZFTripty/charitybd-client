import { Link } from "react-router-dom";


const DashboardLayout = ({ children }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-7">
                {children}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-purple-200 text-base-content min-h-full w-80 p-4">
                    <div className="text-3xl font-mono font-semibold">Admin Panel </div>
                    <li><Link to={"/admin"} className="">Dashboard</Link></li>
                    <li><Link to={"/admin/users"} className="">Users</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;