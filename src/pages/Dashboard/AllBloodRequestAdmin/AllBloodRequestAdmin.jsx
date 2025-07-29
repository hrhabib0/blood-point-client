import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router";
import Swal from "sweetalert2";


const AllBloodRequestAdmin = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [statusFilter, setStatusFilter] = useState(""); // filter by status
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: requests = [], refetch } = useQuery({
        queryKey: ["donationRequests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const filteredRequests = statusFilter
        ? requests.filter(req => req.status === statusFilter)
        : requests;

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const currentItems = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

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


    return (
        <div className="p-5 space-y-4">
            <h2 className="text-2xl font-semibold text-[#B71C1C]">My Donation Requests</h2>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <label htmlFor="filter" className="text-gray-50">Filter by status:</label>
                <select
                    id="filter"
                    value={statusFilter}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#E53935] text-red-800"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-[#E53935] text-white">
                        <tr>
                            <th className="px-4 py-2 border">Recipient</th>
                            <th className="px-4 py-2 border">Location</th>
                            <th className="px-4 py-2 border">Date/Time</th>
                            <th className="px-4 py-2 border">Blood Group</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">No donation requests found.</td>
                            </tr>
                        ) : currentItems.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50 hover:text-red-800">
                                <td className="border px-4 py-2">{req.recipientName}</td>
                                <td className="border px-4 py-2">{req.recipientUpazila}, {req.recipientDistrict}</td>
                                <td className="border px-4 py-2">{format(new Date(req.donationDate), "PPpp")}</td>
                                <td className="border px-4 py-2 font-semibold">{req.bloodGroup}</td>
                                <td className="border px-4 py-2">
                                    <span className={`px-2 py-1 text-sm rounded-full 
                                        ${req.status === "pending" && "bg-yellow-100 text-yellow-700"} 
                                        ${req.status === "inprogress" && "bg-blue-100 text-blue-700"} 
                                        ${req.status === "done" && "bg-green-100 text-green-700"} 
                                        ${req.status === "canceled" && "bg-gray-200 text-gray-600"}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2 text-sm text-blue-600 underline cursor-pointer">
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
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs mx-1"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
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
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-[#B71C1C] text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllBloodRequestAdmin;
