import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <div data-aos="zoom-in" className="max-w-lg">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>

        {/* Message */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The page you’re looking for doesn’t exist or was moved.  
          Don’t worry, let’s get you back to safety!
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
          >
            ⬅ Back to Home
          </Link>
        </div>

        {/* Decorative SVG */}
        <div className="mt-10" data-aos="fade-up">
          <svg
            className="mx-auto w-40 h-40 text-red-200 dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M24 4v40M4 24h40"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
