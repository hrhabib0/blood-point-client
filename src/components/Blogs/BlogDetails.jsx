import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Replace this with real fetch from DB/API later
    const sampleBlogs = [
      {
        id: '1',
        title: 'Why Blood Donation Matters',
        date: '2025-07-20',
        image: 'https://i.ibb.co/39psD4wL/blog1-image.jpg',
        content: `Donating blood is a generous act that can save lives.
        Every day, hospitals require blood for emergencies, surgeries, cancer treatment, and more.
        As a donor, you're making a direct impact on someone’s survival.
        
        Blood cannot be manufactured; it only comes from people like you. 
        Healthy individuals should consider donating regularly to ensure a steady supply in the blood bank.`,
      },
      {
        id: '2',
        title: 'Tips for First Time Donors',
        date: '2025-07-18',
        image: 'https://i.ibb.co/WvmcBP6x/blog2-image.png',
        content: `If you're donating for the first time, don't worry — it's simple and safe.
        
        ✅ Eat a healthy meal beforehand.
        ✅ Stay hydrated.
        ✅ Bring a valid ID.
        ✅ Avoid strenuous activities right after donation.
        
        The donation process usually takes less than an hour and you'll be given refreshments after.`,
      },
    ];

    const selected = sampleBlogs.find(b => b.id === id);
    setBlog(selected);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-gray-600">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#E53935] mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(blog.date).toDateString()}</p>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
      />
      <div className="text-[#1F2937] leading-relaxed whitespace-pre-line text-base bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetails;
