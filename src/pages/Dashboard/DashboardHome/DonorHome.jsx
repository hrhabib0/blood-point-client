import { use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";

const DonorHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: donationRequests = [], refetch } = useQuery({
        queryKey: ['donationRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests?email=${user.email}&limit=3`);
            return res.data;
        },
        enabled: !!user?.email, // avoid fetching if user not loaded yet
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: `Are you sure you want to mark as ${newStatus}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, confirm!",
            });

            if (isConfirmed) {
                const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
                    status: newStatus,
                });
                if (res.data?.result?.modifiedCount > 0) {
                    Swal.fire("Updated!", "Status updated successfully.", "success");
                    refetch();
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update status.", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: "Are you sure you want to delete this request?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });

            if (isConfirmed) {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Request deleted successfully.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500, // closes after 2 seconds
                        timerProgressBar: true,
                    });
                    refetch()
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to delete request.", "error");
        }
    };


    const data = [
        { name: "Pending", value: 5 },
        { name: "In Progress", value: 8 },
        { name: "Done", value: 12 },
    ];

    const COLORS = ["#E53935", "#3B82F6", "#10B981"];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-red-800 mb-6">
                Welcome back, {user?.displayName}!
            </h2>

            {/* Recent Donation Requests */}
            {donationRequests.length > 0 && (
                <div className="bg-white p-6 shadow-lg rounded-2xl overflow-x-auto mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Your Recent Donation Requests
                    </h3>
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="px-4 py-3">Recipient</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">Blood Group</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Donor Info</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((req) => (
                                <tr
                                    key={req._id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2">{req.recipientName}</td>
                                    <td className="px-4 py-2">
                                        {req.recipientUpazila}, {req.recipientDistrict}
                                    </td>
                                    <td className="px-4 py-2">{req.donationDate}</td>
                                    <td className="px-4 py-2">{req.donationTime}</td>
                                    <td className="px-4 py-2 font-semibold">{req.bloodGroup}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${req.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : req.status === "inprogress"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : req.status === "done"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {req.status === "inprogress" ? (
                                            <>
                                                <p>{req.donorName}</p>
                                                <p className="text-gray-600">{req.donorEmail}</p>
                                            </>
                                        ) : (
                                            "--"
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex flex-wrap gap-1 justify-center">
                                        {req.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "done")}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs transition"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "canceled")}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs transition"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        <Link
                                            to={`/dashboard/edit-donation-request/${req._id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-xs transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs transition"
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            to={`/dashboard/donation-request-details/${req._id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs transition"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 text-right">
                        <Link
                            to="/dashboard/my-donation-requests"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full transition"
                        >
                            View My All Requests
                        </Link>
                    </div>
                </div>
            )}

            {/* Donation Status Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-xl transition">
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Donation Status
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={data} dataKey="value" outerRadius={100} label>
                                    {data.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
                                    itemStyle={{ color: "#1F2937", fontWeight: "500" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

export default DonorHome;
