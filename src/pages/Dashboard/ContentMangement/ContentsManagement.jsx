import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios"; // replace with axiosSecure if available
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaUpload, FaDownload } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../../hooks/useUserRole";

const STATUS_OPTIONS = ["all", "draft", "published"];

const ContentsManagement = () => {
    // const [blogs, setBlogs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const { role } = useUserRole()
    const blogsPerPage = 6;

    // Fetch blogs from backend with optional status filter
    const { data: blogs = [], refetch } = useQuery({
        queryKey: ["blogs", filterStatus],
        queryFn: async () => {
            const query = filterStatus !== "all" ? `?status=${filterStatus}` : "";
            const res = await axios.get(`https://blood-point-server.vercel.app/content/blogs${query}`);

            return res.data || [];
        },
    });

    // Pagination logic
    const indexOfLast = currentPage * blogsPerPage;
    const indexOfFirst = indexOfLast - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    // Publish / Unpublish blog (admin only)
    const togglePublish = async (id, currentStatus) => {

        if (!role === "admin") {
            Swal.fire("Unauthorized", "Only admins can change blog status.", "warning");
            return;
        }
        
        
        const newStatus = currentStatus === "draft" ? "published" : "draft";

        const confirmResult = await Swal.fire({
            title: `Are you sure?`,
            text: `This will change blog status to "${newStatus}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed",
        });

        if (!confirmResult.isConfirmed) return;
        if (confirmResult.isConfirmed) {

            try {
                await axios.patch(`https://blood-point-server.vercel.app/content/blogs/${id}/status`, { status: newStatus });
                Swal.fire("Success", `Blog is now ${newStatus}`, "success");
                refetch()
            } catch (err) {
                console.error("Failed to update blog status", err);
                Swal.fire("Error", "Failed to update status", "error");
            }
        }

    };

    // Delete blog (admin only)
    const deleteBlog = async (id) => {
        if (!role === "admin") {
            Swal.fire("Unauthorized", "Only admins can delete blogs.", "warning");
            return;
        }

        const confirmResult = await Swal.fire({
            title: "Are you sure to delete this blog?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            await axios.delete(`https://blood-point-server.vercel.app/content/blogs/${id}`);
            Swal.fire("Deleted!", "Blog has been deleted.", "success");
            refetch()
        } catch (err) {
            console.error("Failed to delete blog", err);
            Swal.fire("Error", "Failed to delete blog", "error");
        }
    };

    return (
        <div className="p-6">
            {/* Header with Add Blog */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-red-800">Content Management</h1>
                <Link
                    to="/dashboard/content-management/add-blog"
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                >
                    Add Blog
                </Link>
            </div>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by status:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => {
                        setCurrentPage(1); // reset page when filter changes
                        setFilterStatus(e.target.value);
                    }}
                    className="border border-gray-300 rounded px-3 py-1"
                >
                    {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.length === 0 && (
                    <p className="text-gray-600 col-span-full text-center">
                        No blogs found.
                    </p>
                )}
                {currentBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded shadow p-4 flex flex-col"
                    >
                        <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className="h-40 object-cover rounded mb-3"
                        />
                        <h3 className="text-xl font-semibold mb-1 text-red-800">{blog.title}</h3>
                        <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${blog.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {blog.status.toUpperCase()}
                        </span>
                        <p className="flex-grow text-gray-700 mb-4">
                            {blog.content
                                ? blog.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "..."
                                : ""}
                        </p>

                        <div className="flex gap-2">
                            {/* Edit button - optional task .. will be done later*/}
                            {/* <Link
                                to={`/dashboard/content-management/edit-blog/${blog._id}`}
                                className="flex items-center gap-1 text-yellow-700 hover:text-yellow-800"
                                title="Edit blog"
                            >
                                <FaEdit /> Edit
                            </Link> */}

                            {/* Publish / Unpublish */}

                            <button
                                onClick={() => togglePublish(blog._id, blog.status)}
                                className={`flex items-center gap-1 px-3 py-1 rounded text-white ${blog.status === "draft"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-yellow-600 hover:bg-yellow-700"
                                    }`}
                                title={blog.status === "draft" ? "Publish blog" : "Unpublish blog"}
                            >
                                {blog.status === "draft" ? <FaUpload /> : <FaDownload />}
                                {blog.status === "draft" ? "Publish" : "Unpublish"}
                            </button>


                            {/* Delete */}
                            {role === "admin" && (
                                <button
                                    onClick={() => deleteBlog(blog._id)}
                                    className="flex items-center gap-1 px-3 py-1 rounded text-white bg-red-700 hover:bg-red-800"
                                    title="Delete blog"
                                >
                                    <FaTrash />
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-3">
                    <button
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`px-3 py-1 rounded border ${currentPage === idx + 1
                                ? "bg-red-700 text-white border-red-700"
                                : "border-gray-300"
                                }`}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentsManagement;
