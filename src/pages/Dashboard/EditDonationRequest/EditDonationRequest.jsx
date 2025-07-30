import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import districtData from "../../../../public/fakeData/districts.json";
import upazilaData from "../../../../public/fakeData/upazilas.json";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: initialData, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data.data;
    }
  });

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!initialData) return;

    // 1) Find district by NAME from DB
    const matchedDistrict = districtData.find(
      (d) => d.name === initialData.recipientDistrict
    );

    // 2) Build a transformed object for the form:
    //    - district as ID (for the select)
    //    - upazila as NAME (matches your option value)
    const formDefaults = {
      ...initialData,
      recipientDistrict: matchedDistrict ? matchedDistrict.id : "",
      // keep upazila as name — your <option value> is name
      recipientUpazila: initialData.recipientUpazila || "",
    };

    // 3) Reset the form (prefill everything)
    reset(formDefaults);

    // 4) Set selected district id for filtering upazilas
    setSelectedDistrictId(formDefaults.recipientDistrict);
  }, [initialData, reset]);

  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  // Compute available upazilas whenever district changes
  useEffect(() => {
    if (!selectedDistrictId) {
      setAvailableUpazilas([]);
      return;
    }
    const filtered = upazilaData.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setAvailableUpazilas(filtered);
  }, [selectedDistrictId]);

  // After upazilas are available, make sure the prefilled upazila (NAME) is set
  useEffect(() => {
    if (!initialData) return;
    // Only set if the prefilled upazila exists in the filtered list
    const exists = availableUpazilas.some(
      (u) => u.name === initialData.recipientUpazila
    );
    if (exists) {
      setValue("recipientUpazila", initialData.recipientUpazila);
    }
  }, [availableUpazilas, initialData, setValue]);

  // District change handler (keep upazila as name)
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);
    setValue("recipientDistrict", districtId);
    setAvailableUpazilas(
      upazilaData.filter((u) => u.district_id === districtId)
    );
    setValue("recipientUpazila", ""); // reset upazila on district change
  };


  const onSubmit = async (data) => {
    const selectedDistrictObj = districtData.find(
      (district) => district.id === selectedDistrictId
    );
    const districtName = selectedDistrictObj?.name || '';
    const updatedData = {
      ...data,
      recipientDistrictId: selectedDistrictId,
      recipientDistrict: districtName, // 👈 Send this too
    };
    try {
      const res = await axios.patch(`https://blood-point-server.vercel.app/${initialData._id}`, updatedData);
      if (res.data?.result?.modifiedCount > 0) {
        Swal.fire("Success!", "Donation request updated.", "success");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Failed to update donation request", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#E53935]">
        Edit Donation Request
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="label text-gray-800">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && <p className="text-red-500">Name is required</p>}
        </div>

        <div>
          <label className="label text-gray-800">District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            value={selectedDistrictId}
            className="select select-bordered w-full"
            onChange={handleDistrictChange}
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
          <label className="label text-gray-800">Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select an upazila</option>
            {availableUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && <p className="text-red-500">Upazila is required</p>}
        </div>

        <div>
          <label className="label text-gray-800">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label text-gray-800">Address Line</label>
          <input
            type="text"
            {...register("addressLine")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label text-gray-800">Blood Group</label>
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
          <label className="label text-gray-800">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label text-gray-800">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label text-gray-800">Request Message</label>
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
