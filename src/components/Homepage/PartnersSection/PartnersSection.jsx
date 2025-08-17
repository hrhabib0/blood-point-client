const partners = [
  { id: 1, name: "Red Crescent", logo: "https://i.ibb.co.com/F4Gd5VB3/red-cresent.png" },
  { id: 2, name: "City Hospital", logo: "https://i.ibb.co.com/9zs5fY4/City-hospital.jpg" },
  { id: 3, name: "LifeLine NGO", logo: "https://i.ibb.co.com/4ZR7J0Qb/Life-Line-NGO.png" },
  { id: 4, name: "HealthCorp", logo: "https://i.ibb.co.com/XfzdYjy8/Health-Corp.jpg" },
];


const PartnersSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-text py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12"  data-aos="fade-up">Our Partners & Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
          {partners.map((partner,index) => (
            <div
              key={partner.id}
              className="flex justify-center items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
