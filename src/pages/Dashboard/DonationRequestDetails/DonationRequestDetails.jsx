import React, { useState, use } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";



const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [modalOpen, setModalOpen] = useState(false);

    // Fetch donation request details
    const { data: request, isLoading, isError } = useQuery({
        queryKey: ['donationRequests', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests/${id}`);
            return res.data.data;
        },
    });


    const handleDonateConfirm = async (e) => {
        e.preventDefault();
        const donorPhone = e.target.donorPhone.value;

        const donationData = {
            status: "inprogress",
            donorInfo: {
                name: user.displayName,
                email: user.email,
                donorPhone,
            },
        };

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to proceed as a donor?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/donation-requests/status/${id}`, donationData);

                    if (res.data?.result?.modifiedCount > 0 || res.data?.result?.acknowledged) {
                        Swal.fire("Success!", "Donation status updated.", "success");
                        queryClient.invalidateQueries({ queryKey: ["donationRequest", id] });
                        queryClient.invalidateQueries({ queryKey: ["donationRequests", user.email] });
                        setModalOpen(false);
                    } else {
                        Swal.fire("Warning", "No changes made. Try again.", "warning");
                    }
                } catch (error) {
                    console.error("Donation status update failed:", error);
                    Swal.fire("Error", "Failed to update donation status.", "error");
                }
            }
        });
    };

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load donation request.</p>;
    if (!request) return <p>No data found.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-red-800">Donation Request Details</h1>

            <div className="space-y-3 text-gray-700">
                <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                <p><strong>Recipient District:</strong> {request.recipientDistrict}</p>
                <p><strong>Recipient Upazila:</strong> {request.recipientUpazila}</p>
                <p><strong>Hospital Name:</strong> {request.hospitalName}</p>
                <p><strong>Address:</strong> {request.addressLine}</p>
                <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                <p><strong>Donation Date:</strong> {request.donationDate}</p>
                <p><strong>Donation Time:</strong> {request.donationTime}</p>
                <p><strong>Request Message:</strong> {request.requestMessage}</p>
                <p><strong>Requester Name:</strong> {request.requesterName}</p>
                <p><strong>Requester Email:</strong> {request.requesterEmail}</p>
                <p><strong>Status:</strong> <span className="capitalize">{request.status}</span></p>
                {
                    request.status == "inprogress" && (
                        <>
                            <p><strong>Donor Name:</strong> {request.donorName}</p>
                            <p><strong>Donor Email:</strong> {request.donorEmail}</p>
                            <p><strong>Donor Phone:</strong> {request.donorPhone}</p>
                        </>
                    )
                }
            </div>

            {/* Donate button visible only if status is 'pending' */}
            {request.status === "pending" && (
                <button
                    onClick={() => setModalOpen(true)}
                    className="mt-6 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-2 rounded"
                >
                    Donate
                </button>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-red-50 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-red-800">Confirm Donation</h2>
                        <form onSubmit={handleDonateConfirm} className="space-y-4">
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Donor Name</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={user?.displayName || ""}
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-red-800"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Donor Email</label>
                                <input
                                    type="email"
                                    readOnly
                                    value={user?.email || ""}
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-red-800"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Donor Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Your contact no."
                                    name="donorPhone"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-red-800"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-red-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded"
                                >
                                    {isLoading ? "Processing..." : "Confirm"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationRequestDetails;
