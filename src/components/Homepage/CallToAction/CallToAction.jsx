import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden">
    
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Become a Life Saver Today!
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join our community of blood donors and help save lives. Every donation counts and your effort can make a difference.
        </p>
        <Link
          to="/login"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
