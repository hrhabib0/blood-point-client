import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import districtData from "../../../../public/fakeData/districts.json";
import upazilaData from "../../../../public/fakeData/upazilas.json";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch donation request data
  const { data: initialData, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data.data;
    },
    onSuccess: (initialData) => {
      reset(initialData); // Pre-fill form with fetched data
      setSelectedDistrictId(initialData.recipientDistrict); // set district to match upazila
    },
  });
  useEffect (()=>{
    if(initialData){
setValue("recipientName", initialData.recipientName, "recipientDistrict", initialData.recipientDistrict)
    }
  },[initialData])

  // Watch selected district to filter upazilas
  const districtId = watch("recipientDistrict") || selectedDistrictId;

  const filteredUpazilas = upazilaData.filter(
    (upazila) => upazila.district_id === districtId
  );

  const onSubmit = async (updatedData) => {
    try {
      const res = await axiosSecure.patch(
        `/donation-requests/${id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Donation request updated.", "success");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Failed to update donation request", "error");
    }
  };

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#E53935]">
        Edit Donation Request
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && <p className="text-red-500">Name is required</p>}
        </div>

        <div>
          <label className="label">District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="select select-bordered w-full"
            onChange={(e) => setSelectedDistrictId(e.target.value)}
          >
            <option value="">Select a district</option>
            {districtData.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && <p className="text-red-500">District is required</p>}
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select an upazila</option>
            {filteredUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && <p className="text-red-500">Upazila is required</p>}
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Address Line</label>
          <input
            type="text"
            {...register("addressLine")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage")}
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn bg-[#E53935] text-white w-full">
            Update Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
