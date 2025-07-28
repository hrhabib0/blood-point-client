import { use, useEffect, useState } from 'react';

import { FaEdit, FaSave } from 'react-icons/fa';
import districtsData from "../../../../public/fakeData/districts.json";
import upazilasData from "../../../../public/fakeData/upazilas.json";
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const { data: userData = {} } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email
  });


  useEffect(() => {
    if (userData?.email) {
      setFormData(userData);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const district = districtsData.find((d) => d.id === districtId);
    setFormData({
      ...formData,
      districtId,
      districtName: district.name,

    });
  };

  // Filter upazilas based on selected district
  const filteredUpazilas = upazilasData.filter(
    upazila => upazila.district_id === formData.districtId
  );

  const handleUpazilaChange = (e) => {
    setFormData({
      ...formData,
      upazila: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    setImageFile(file);
  };

  // save changes
  const handleChanges = async (e) => {
    e.preventDefault();
    let updatedData = { ...formData };

    // Handle image upload if new image selected
    if (imageFile) {
      const imageData = new FormData();
      imageData.append('image', imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, {
        method: 'POST',
        body: imageData,
      });
      const data = await res.json();
      if (data.success) {
        updatedData.avatar = data.data.url;
      } else {
        alert('Image upload failed');
        // toast.error('Image upload failed');
        return;
      }
    }

    try {
      const res = await axiosSecure.put(`/users?email=${user.email}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Profile updated successfully',
          showConfirmButton: false,
          timer: 2000, // disappears after 2 seconds
          timerProgressBar: true,
        });
        setIsEditing(false);
        // refetch();
      }
      console.log('fetch data', res)
    } catch (err) {
      alert('Update failed', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#B71C1C]">My Profile</h2>
        {/* <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 bg-[#E53935] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg transition"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? 'Save' : 'Edit'}
        </button> */}
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn btn-sm bg-[#E53935] text-white hover:bg-[#B71C1C]">Edit</button>
        ) : (
          <button onClick={handleChanges} className="btn btn-sm bg-green-600 text-white hover:bg-green-700">Save</button>
        )}
      </div>

      <form className="space-y-4">
        {/* Avatar Image */}
        <div className="flex flex-col items-center">
          <img
            src={formData?.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#E53935]"
          />
          {isEditing && (
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input mt-2 text-sm text-red-800"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="label text-red-800">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={formData.name || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="label text-red-800">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full bg-gray-100"
              value={formData.email || ''}
              readOnly
              disabled
            />
          </div>

          <div>
            <label className="label text-red-800">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="select select-bordered w-full"
            >
              <option value="">Select Group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label text-red-800">District</label>
            <select
              name="districtId"
              value={formData.districtId || ''}
              onChange={handleDistrictChange}
              disabled={!isEditing}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districtsData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label text-red-800">Upazila</label>
            <select
              name="upazila"
              value={formData.upazila || ''}
              onChange={handleUpazilaChange}
              disabled={!isEditing || !formData.districtId}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
