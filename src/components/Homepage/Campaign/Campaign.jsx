import campaign1 from "../../../assets/images/Campaign1.jpeg";
import campaign2 from "../../../assets/images/Campaign2.jpg";
import campaign3 from "../../../assets/images/Campaign3.png";

const campaigns = [
  {
    id: 1,
    title: "City Blood Donation Drive",
    date: "Aug 25, 2025",
    location: "Dhaka, Bangladesh",
    image: campaign1,
  },
  {
    id: 2,
    title: "University Awareness Campaign",
    date: "Sep 10, 2025",
    location: "Chittagong, Bangladesh",
    image: campaign2,
  },
  {
    id: 3,
    title: "Corporate Blood Drive",
    date: "Oct 05, 2025",
    location: "Sylhet, Bangladesh",
    image: campaign3,
  },
];

const Campaign = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12">Our Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold text-red-600 mb-2">{campaign.title}</h3>
                <p className="text-gray-900 mb-1"><strong>Date:</strong> {campaign.date}</p>
                <p className="text-gray-900"><strong>Location:</strong> {campaign.location}</p>
                {/* <button className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                  View Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaign;
