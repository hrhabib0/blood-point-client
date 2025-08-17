const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-red-600 mb-6 text-center">About BloodPoint</h1>
        
        <p className="text-lg mb-6">
          BloodPoint is a platform designed to save lives by connecting blood donors with those in need.
          Our mission is to make blood donation easy, reliable, and efficient for everyone.
        </p>

        <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Mission</h2>
        <p className="mb-6">
          We aim to raise awareness about blood donation, encourage more donors, and ensure timely delivery of blood to recipients in urgent need.
        </p>

        <h2 className="text-2xl font-semibold text-red-600 mb-4">What We Do</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Connect donors with recipients quickly and efficiently.</li>
          <li>Provide verified donation requests for safety and reliability.</li>
          <li>Run awareness campaigns and blood donation events.</li>
          <li>Maintain transparency and trust within our community.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-red-600 mb-4">Join Us</h2>
        <p>
          Whether you are a donor or someone in need of blood, BloodPoint is here to support you. 
          Join our community and help save lives today.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
