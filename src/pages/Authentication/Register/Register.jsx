import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import districtsData from '../../../../public/fakeData/districts.json';
import upazilasData from '../../../../public/fakeData/upazilas.json';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Register = () => {
    const { createUser, updateUserProfile, setUser } = use(AuthContext)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    useEffect(() => {
        if (selectedDistrict) {
            const filtered = upazilasData.filter(
                (u) => u.district_id === selectedDistrict
            );
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrict]);

    const handleRegister = async (data) => {
        setLoading(true)
        // const district = districtsData.find()
        const sinlgeDistrictData = districtsData.find(
            (district) => district.id === data.district
        );
        console.log(sinlgeDistrictData)
        try {
            // upload image to imgbb
            const imageFile = data.avatar[0];
            const formData = new FormData();
            formData.append('image', imageFile);
            const uploadResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                formData
            );
            const imageUrl = uploadResponse.data.data.url;
            // create new user
            createUser(data.email, data.password)
                .then(async (result) => {
                    const user = result.user; // get user.
                    if (user) {
                        // update user in firebase
                        const profileInfo = {
                            displayName: data.name,
                            photoURL: imageUrl,
                        }
                        // update user information
                        await updateUserProfile(profileInfo)
                            .then(() => {
                                setUser({ ...user, ...profileInfo })
                                console.log("user update done")
                            })
                            .catch(errors => {
                                console.log(errors)
                            })
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            avatar: imageUrl,
                            bloodGroup: data.bloodGroup,
                            districtId: data.district,
                            districtName: sinlgeDistrictData.name,
                            upazila: data.upazila,
                            role: 'donor',
                            staus: 'active'
                        };
                        const userRes = await axios.post('http://localhost:3000/users', userInfo);

                        // after update successful navigate and show alert
                        if (userRes.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                            console.log('User Info:', userRes.data);
                            setLoading(false)
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
            // TODO: Send userInfo to your server or Firebase
            reset();
        } catch (error) {
            console.error('Image upload or form submission failed:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Register</h2>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register('name', { required: true })}
                    className="input input-bordered w-full"
                />
                {errors.name && <span className='text-red-600'>Name is required</span>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                    className="input input-bordered w-full"
                />
                {errors.email && <span className='text-red-600'>Email is required</span>}
                <input
                    type="file"
                    accept="image/*"
                    {...register('avatar', { required: true })}
                    className="file-input file-input-bordered w-full"
                />
                {errors.avatar && <span className='text-red-600'>Avatar is required</span>}
                <select
                    {...register('bloodGroup', { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
                {errors.bloodGroup && <span className='text-red-600'>Blood Group is required</span>}
                <select
                    {...register('district', { required: true })}
                    className="select select-bordered w-full"
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="">Select District</option>
                    {districtsData.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>
                {errors.district && <span className='text-red-600'>District is required</span>}
                <select
                    {...register('upazila', { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                        </option>
                    ))}
                </select>
                {errors.upazila && <span className='text-red-600'>Upazila is required</span>}
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className="input input-bordered w-full"
                />
                {errors.password && <span className='text-red-600'>Password is required</span>}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirm_password', {
                        required: true,
                        validate: (value) => value === watch('password') || "Passwords do not match",
                    })}
                    className="input input-bordered w-full"
                />
                {errors.confirm_password && <span className='text-red-600'>{errors.confirm_password.message}</span>}
                <button type="submit" className="btn btn-success w-full" disabled={loading}>
                    {loading ? (
                        <span className="loading loading-spinner loading-sm">Loading...</span>
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;
