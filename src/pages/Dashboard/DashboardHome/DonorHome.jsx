import { use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DonorHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: donationRequests = [], refetch } = useQuery({
        queryKey: ['donationRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests?requesterEmail=${user.email}&limit=3`);
            return res.data;
        },
        enabled: !!user?.email, // avoid fetching if user not loaded yet
    });
    console.log('donation req', donationRequests)

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

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
                Welcome back, {user?.displayName}!
            </h2>

            {donationRequests.length > 0 && (
                <div className="bg-white p-4 shadow rounded-lg overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                        Your Recent Donation Requests
                    </h3>
                    <table className="min-w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-3 py-2">Recipient</th>
                                <th className="px-3 py-2">Location</th>
                                <th className="px-3 py-2">Date</th>
                                <th className="px-3 py-2">Time</th>
                                <th className="px-3 py-2">Blood Group</th>
                                <th className="px-3 py-2">Status</th>
                                <th className="px-3 py-2">Donor Info</th>
                                <th className="px-3 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((req) => (
                                <tr key={req._id} className="border-b">
                                    <td className="px-3 py-2">{req.recipientName}</td>
                                    <td className="px-3 py-2">
                                        {req.recipientUpazila}, {req.recipientDistrict}
                                    </td>
                                    <td className="px-3 py-2">{req.donationDate}</td>
                                    <td className="px-3 py-2">{req.donationTime}</td>
                                    <td className="px-3 py-2">{req.bloodGroup}</td>
                                    <td className="px-3 py-2 capitalize">{req.status}</td>
                                    <td className="px-3 py-2">
                                        {req.status === "inprogress"  ? (
                                            <>
                                                <p>{req.donorName}</p>
                                                <p>{req.donorEmail}</p>
                                            </>
                                        ) : (
                                            "--"
                                        )}
                                    </td>
                                    <td className="px-3 py-2 flex flex-wrap gap-1 justify-center">
                                        {req.status === "inprogress" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "done")}
                                                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Done
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, "canceled")}
                                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        <Link
                                            to={`/dashboard/edit-donation-request/${req._id}`}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            to={`/dashboard/donation-request-details/${req._id}`}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 text-right">
                        <Link
                            to="/dashboard/my-donation-requests"
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            View My All Requests
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorHome;
