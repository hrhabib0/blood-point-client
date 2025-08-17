import { FaQuoteLeft } from "react-icons/fa";
import "aos/dist/aos.css"; // make sure AOS CSS is imported

const reviews = [
  {
    id: 1,
    name: "Rifat Hossain",
    location: "Dhaka, Bangladesh",
    image: "https://i.ibb.co.com/qLKt21DL/admin-image.jpg",
    review: "BloodPoint made donating blood so easy and organized. I could help someone in need within hours!",
  },
  {
    id: 2,
    name: "Sara Khan",
    location: "Chittagong, Bangladesh",
    image: "https://i.ibb.co.com/Y7LVwbmj/lawyers9.jpg",
    review: "I love the transparency and updates on each donation request. Highly recommended platform.",
  },
  {
    id: 3,
    name: "Aminul Islam",
    location: "Sylhet, Bangladesh",
    image: "https://i.ibb.co.com/XN1rc4s/lawyers10.jpg",
    review: "The BloodPoint team is amazing. They make sure every donor and recipient is connected safely.",
  },
];

const Reviews = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-text py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12" data-aos="fade-up">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg shadow-lg p-6 relative"
              data-aos="fade-up"
              data-aos-delay={review.id * 100}
            >
              <FaQuoteLeft className="text-red-600 text-3xl absolute -top-6 left-6" />
              <p className="text-gray-900 mb-6 mt-4">{review.review}</p>
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-red-600"
                />
                <div className="text-left">
                  <p className="font-semibold text-red-600">{review.name}</p>
                  <p className="text-red-600/50 text-sm">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
