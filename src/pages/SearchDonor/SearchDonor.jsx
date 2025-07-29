import { useEffect, useState } from "react";
import axios from "axios";
import districtsData from "../../../public/fakeData/districts.json";
import upazilasData from "../../../public/fakeData/upazilas.json";

const SearchDonor = () => {
    const bloodGroupsArray = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [formData, setFormData] = useState({
        bloodGroup: "",
        district: "",
        upazila: ""
    });
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const filteredUpazilas = upazilasData.filter(
            (upa) => upa.district_id === selectedDistrict
        );
        setUpazilas(filteredUpazilas);
    }, [selectedDistrict]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "district") setSelectedDistrict(value);
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://blood-point-server.vercel.app/donors/search`, {
                params: formData
            });
            setDonors(res.data);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="bg-gradient-to-b from-red-50 via-white to-red-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600 text-center">Search A Donor!</h2>

                <form
                    onSubmit={handleSearch}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroupsArray.map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>

                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">Select District</option>
                        {districtsData.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">Select Upazila</option>
                        {upazilas.map((upa) => (
                            <option key={upa.id} value={upa.name}>
                                {upa.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="btn col-span-full bg-red-700 text-white hover:bg-red-800 ">
                        Search Donors
                    </button>
                </form>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.length > 0 ? (
                        donors.map((donor) => (
                            <div key={donor._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white text-red-800" data-aos="zoom-in" data-aos-delay="100">
                                <img
                                    src={donor.avatar}
                                    alt="avatar"
                                    className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-2 border-red-500"
                                />
                                <h2 className="text-xl font-bold text-center">{donor.name}</h2>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>District: {donor.districtName}</p>
                                <p>Upazila: {donor.upazila}</p>
                                <p>Phone: {donor.phoneNumber || "N/A"}</p>
                                <p>Email: {donor.email || "N/A"}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No donors to show yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchDonor;
