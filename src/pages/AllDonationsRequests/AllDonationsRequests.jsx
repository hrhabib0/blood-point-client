import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import axios from 'axios';



const AllDonationsRequests = () => {


  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['pendingDonationRequests'],
    queryFn: async () => {
      const res = await axios.get('https://blood-point-server.vercel.app/all-donation-requests?status=pending');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-10 py-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#E53935] mb-6">
        All Pending Blood Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map(req => (
          <div key={req._id} className="bg-gray-100 border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-2">{req.recipientName}</h3>

            <p className="text-sm text-gray-600 flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500" />
              {req.recipientDistrict}, {req.recipientUpazila}
            </p>

            <p className="text-sm text-gray-700 flex items-center gap-1 mt-1">
              <FaTint className="text-[#E53935]" />
              <span className="font-bold">{req.bloodGroup}</span>
            </p>

            <p className="text-sm mt-2 text-gray-700">
              📅 {new Date(req.donationDate).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-700">
              ⏰ {new Date(req.donationDate).toLocaleTimeString()}
            </p>

            <Link
              to={`/dashboard/donation-request-details/${req._id}`}
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-[#E53935] text-white font-medium hover:bg-[#B71C1C] transition"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonationsRequests;
