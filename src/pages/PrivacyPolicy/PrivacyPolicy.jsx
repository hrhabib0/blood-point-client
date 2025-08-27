import { Link } from "react-router";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900 dark:text-gray-50">
      <h1 className="text-4xl font-bold text-[#B71C1C] mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <span className="font-semibold">BloodPoint</span>, we value and respect your privacy.
        This Privacy Policy explains how we collect, use, and protect your personal
        information when you use our platform.
      </p>

      <h2 className="text-2xl font-semibold text-[#E53935] mt-6 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect your personal information such as name, email, phone number,
        blood group, and location when you create an account or request donations.
      </p>

      <h2 className="text-2xl font-semibold text-[#E53935] mt-6 mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To connect blood donors with recipients</li>
        <li>To improve our services and platform experience</li>
        <li>To ensure security and prevent fraud</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#E53935] mt-6 mb-3">3. Data Protection</h2>
      <p className="mb-4">
        We use secure methods to protect your personal data. However, no method
        of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold text-[#E53935] mt-6 mb-3">4. Your Rights</h2>
      <p className="mb-4">
        You have the right to update, modify, or delete your personal data. For
        any privacy-related concerns, please contact our support team.
      </p>

      <div className="mt-8">
        <Link to="/" className="text-[#E53935] hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
