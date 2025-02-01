import useSeeAllUsers from "../../../Hooks/useSeeAllUsers";


const UserTable = () => {
    const { users, isLoading } = useSeeAllUsers()
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? <tr><td colSpan="4">Loading...</td></tr> :
                            users.map((user) => (<>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photo}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge badge-neutral ${user.role === "admin" ? "bg-purple-600" :"bg-orange-500"} border-none`}>
                                            {user.role}
                                        </div>
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            </>))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;