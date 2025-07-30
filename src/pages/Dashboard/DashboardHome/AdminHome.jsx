import { use } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaDonate, FaTint } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";



const AdminHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch total donors (users with role === "donor")
    const { data: totalDonors = 0, isLoading } = useQuery({
        queryKey: ["totalDonors"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users/count/donor");
            return res.data?.count || 0;
        },
    });

    // Fetch total donation requests
    const { data: totalRequests = 0 } = useQuery({
        queryKey: ["totalDonationRequests"],
        queryFn: async () => {
            const res = await axiosSecure.get("count-donation-requests");
            return res.data?.count || 0;
        },
    });

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="space-y-8">
            {/* Welcome Message */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, <span className="text-red-700">{user?.displayName || "Admin"}</span>!
                </h2>
                <p className="text-gray-500 mt-1">Here’s a quick overview of the platform’s current status.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Total Donors */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-center gap-4">
                    <div className="text-white bg-red-600 rounded-full p-4 text-3xl">
                        <FaUsers />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{totalDonors}</h3>
                        <p className="text-gray-600">Total Donors</p>
                    </div>
                </div>

                {/* Total Donation Requests */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-center gap-4">
                    <div className="text-white bg-crimson-700 rounded-full p-4 text-3xl bg-[#B71C1C]">
                        <FaTint />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{totalRequests}</h3>
                        <p className="text-gray-600">Blood Donation Requests</p>
                    </div>
                </div>

                {/* Total Funding (Static for now) */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-center gap-4">
                    <div className="text-white bg-blue-500 rounded-full p-4 text-3xl">
                        <FaDonate />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">$1234</h3>
                        <p className="text-gray-600">Total Funding</p>
                        {/* TODO: Replace with dynamic data from funding collection later */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
