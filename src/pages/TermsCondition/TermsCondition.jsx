import { Link } from "react-router";

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Terms & Conditions</h1>
      <p className="mb-4">
        By accessing and using <span className="font-semibold">BloodPoint</span>,
        you agree to comply with the following terms and conditions. Please
        read them carefully.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-3">1. User Responsibilities</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You must provide accurate and truthful information.</li>
        <li>You are responsible for keeping your login details secure.</li>
        <li>You must not misuse the platform or engage in fraudulent activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-3">2. Donation Requests</h2>
      <p className="mb-4">
        Donation requests must be genuine. False or misleading requests will lead
        to account suspension or termination.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-3">3. Limitation of Liability</h2>
      <p className="mb-4">
        BloodPoint acts as a platform to connect donors and recipients. We are
        not responsible for the outcome of donations or misuse of information.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-3">4. Modifications</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms & Conditions at any time. Changes
        will be updated on this page.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-3">5. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by the laws of Bangladesh. Any disputes will be
        resolved in accordance with applicable laws.
      </p>

      <div className="mt-8">
        <Link to="/" className="text-red-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsConditions;
