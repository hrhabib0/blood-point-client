import "aos/dist/aos.css";

const FAQ = () => {


  const faqs = [
    {
      question: "What is BloodPoint?",
      answer:
        "BloodPoint is a platform that connects blood donors with recipients, making it easier to find and donate blood when needed.",
    },
    {
      question: "How can I become a donor?",
      answer:
        "Simply create an account, update your profile with your blood group and availability, and you’re ready to donate.",
    },
    {
      question: "Is there any cost for using the platform?",
      answer:
        "No, BloodPoint is completely free to use for both donors and recipients.",
    },
    {
      question: "How do I request blood?",
      answer:
        "You can submit a donation request form with patient details, required blood group, and hospital information. Donors will be notified.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, we value your privacy and keep your personal data secure. Only necessary details are shared with donors/recipients.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-gray-800 dark:text-gray-200">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600 dark:text-gray-400">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
