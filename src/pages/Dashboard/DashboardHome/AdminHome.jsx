import { use } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaDonate, FaTint } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch total donors
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
            const res = await axiosSecure.get("/count-donation-requests");
            return res.data?.count || 0;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Polished card stats array
    const stats = [
        {
            title: "Total Donors",
            value: totalDonors,
            icon: <FaUsers />,
            color: "bg-red-600",
        },
        {
            title: "Blood Donation Requests",
            value: totalRequests,
            icon: <FaTint />,
            color: "bg-[#B71C1C]",
        },
        {
            title: "Total Funding",
            value: "$1234",
            icon: <FaDonate />,
            color: "bg-blue-500",
        },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6">
            {/* Welcome Message */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-red-700">{user?.displayName || "Admin"}</span>!
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Here’s a quick overview of the platform’s current status.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex items-center gap-5 hover:shadow-xl transition-all duration-300"
                    >
                        <div className={`text-white ${stat.color} rounded-full p-4 text-3xl flex items-center justify-center w-16 h-16`}>
                            {stat.icon}
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</h3>
                            <p className="text-gray-600 text-sm md:text-base">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
