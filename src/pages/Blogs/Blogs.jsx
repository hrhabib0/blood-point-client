import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Blogs = () => {

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get('https://blood-point-server.vercel.app/content/published-blogs?status=published'); // 🔁 Update API URL if needed
            console.log(res.data)
            return res.data;
        },
    });
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E53935] text-center mb-10">Our Latest Blogs</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden"
                    >
                        <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-5 flex flex-col gap-2">
                            <p className="text-sm text-gray-500">{new Date(blog.updatedAt).toDateString()}</p>
                            <h3 className="text-xl font-semibold text-[#1F2937]">{blog.title}</h3>
                            <p className="text-sm text-[#6B7280]">{blog.excerpt}</p>
                            <Link
                                to={`/blogs/${blog._id}`}
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
