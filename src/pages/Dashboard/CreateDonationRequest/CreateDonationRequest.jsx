import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// import districtsData from "../../../data/districts.json";
import districtsData from "../../../../public/fakeData/districts.json";
import upazilasData from "../../../../public/fakeData/upazilas.json";
import Swal from "sweetalert2";


const CreateDonationRequest = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, watch, reset } = useForm();
    const [upazilas, setUpazilas] = useState([]);

    const selectedDistrict = watch("recipientDistrict");

    // Load upazilas on district change
    useEffect(() => {
        if (selectedDistrict) {
            // find selectedDistrictData
            const selectedDistrictData = districtsData.find(d => d.name === selectedDistrict);
            // Filter upazilas based on selected 
            const filteredUpazilas = upazilasData.filter(
                upazila => upazila.district_id === selectedDistrictData.id
            );
            setUpazilas(filteredUpazilas);
        }
    }, [selectedDistrict]);


    const onSubmit = async (data) => {
        // if (userData?.status === "blocked") {
        //     return toast.error("You are blocked and cannot create a donation request.");
        // }

        const requestData = {
            ...data,
            requesterName: user?.displayName,
            requesterEmail: user?.email,
        };
        console.log('form data', data)
        console.log('sendig data', requestData)

        try {
            const res = await axiosSecure.post("/donation-requests", requestData);
            if (res.data?.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Donation request submitted successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
                reset();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to submit request. Please try again.',
                confirmButtonColor: '#E53935'
            });
        }

    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-[#B71C1C]">Create Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

                {/* Read-only fields */}
                <div>
                    <label className="font-semibold">Requester Name</label>
                    <input
                        className="input input-bordered w-full text-gray-300"
                        defaultValue={user?.displayName}
                        readOnly
                    />
                </div>

                <div>
                    <label className="font-semibold">Requester Email</label>
                    <input
                        className="input input-bordered w-full text-gray-300"
                        defaultValue={user?.email}
                        readOnly
                    />
                </div>

                {/* Recipient Details */}
                <div>
                    <label className="font-semibold">Recipient Name</label>
                    <input
                        className="input input-bordered w-full text-gray-300"
                        {...register("recipientName", { required: true })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Recipient District</label>
                        <select
                            className="select select-bordered w-full text-gray-300"
                            {...register("recipientDistrict", { required: true })}
                        >
                            <option value="">Select District</option>
                            {districtsData.map((d, idx) => (
                                <option key={idx} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold">Recipient Upazila</label>
                        <select
                            className="select select-bordered w-full text-gray-300"
                            {...register("recipientUpazila", { required: true })}
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map((upazila, idx) => (
                                <option key={idx} value={upazila.name}>{upazila.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="font-semibold">Hospital Name</label>
                    <input
                        className="input input-bordered w-full text-gray-300"
                        placeholder="e.g. Dhaka Medical College Hospital"
                        {...register("hospitalName", { required: true })}
                    />
                </div>

                <div>
                    <label className="font-semibold">Full Address Line</label>
                    <input
                        className="input input-bordered w-full text-gray-300"
                        placeholder="e.g. Zahir Raihan Rd, Dhaka"
                        {...register("addressLine", { required: true })}
                    />
                </div>

                <div>
                    <label className="font-semibold">Blood Group</label>
                    <select
                        className="select select-bordered w-full text-gray-300"
                        {...register("bloodGroup", { required: true })}
                    >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Donation Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full text-gray-300"
                            {...register("donationDate", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Donation Time</label>
                        <input
                            type="time"
                            className="input input-bordered w-full text-gray-300"
                            {...register("donationTime", { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <label className="font-semibold">Request Message</label>
                    <textarea
                        className="textarea textarea-bordered w-full text-gray-300"
                        rows={4}
                        placeholder="Write the reason you need blood..."
                        {...register("requestMessage", { required: true })}
                    />
                </div>

                <button className="btn bg-[#E53935] hover:bg-[#B71C1C] text-white mt-4">
                    Request Blood
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;