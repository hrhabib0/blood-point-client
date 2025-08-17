import { Link } from "react-router";

const AboutUsSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-text py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">About BloodPoint</h2>
        <p className="text-lg mb-6">
          BloodPoint is dedicated to saving lives by connecting donors and recipients efficiently. 
          We aim to raise awareness about blood donation and make the process fast, reliable, and transparent.
        </p>
        <Link 
          to="/about" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default AboutUsSection;
