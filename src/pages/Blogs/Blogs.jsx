import { Link } from 'react-router';

const Blogs = () => {
    const blogs = [

        {
            id: 1,
            title: "Why Blood Donation Matters",
            image: "https://i.ibb.co/39psD4wL/blog1-image.jpg",
            excerpt: "Learn why donating blood can save lives and how it benefits your health.",
            date: "2025-07-20",
        },
        {
            id: 2,
            title: "Tips for First Time Donors",
            image: "https://i.ibb.co/WvmcBP6x/blog2-image.png",
            excerpt: "Nervous about donating for the first time? Here's how to prepare.",
            date: "2025-07-18",
        },

    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E53935] text-center mb-10">Our Latest Blogs</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden"
                        data-aos="fade-up"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-5 flex flex-col gap-2">
                            <p className="text-sm text-gray-500">{new Date(blog.date).toDateString()}</p>
                            <h3 className="text-xl font-semibold text-[#1F2937]">{blog.title}</h3>
                            <p className="text-sm text-[#6B7280]">{blog.excerpt}</p>
                            <Link
                                to={`/blogs/${blog.id}`}
                                className="mt-auto text-[#E53935] font-medium hover:underline"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
