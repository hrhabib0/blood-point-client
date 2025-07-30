import { useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog-details", id],
    queryFn: async () => {
      const res = await axios.get(`https://blood-point-server.vercel.app/content/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-gray-600">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-red-50" data-aos="zoom-in">
      <h1 className="text-3xl md:text-4xl font-bold text-[#E53935] mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(blog.createdAt).toDateString()}</p>
      <img
        src={blog.thumbnailUrl}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
      />
      <div
        className="prose prose-lg mt-6 text-gray-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
