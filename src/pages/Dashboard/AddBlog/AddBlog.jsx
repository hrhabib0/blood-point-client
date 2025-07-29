import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import axios from "axios";

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        const imageFile = { image: data.thumbnail[0] };

        try {
            // Upload thumbnail to imgbb
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                imageFile,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            );

            const thumbnailUrl = imgRes.data.data.url;

            const blogData = {
                title: data.title,
                thumbnail: thumbnailUrl,
                content: content,
            };

            const res = await axios.post("https://blood-point-server.vercel.app/content/blogs", blogData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Blog created successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setIsSubmitting(false)
                reset();
                setContent("");
                navigate("/dashboard/content-management");
            } else {
                throw new Error("Insert failed");
            }
        } catch (error) {
            console.error(error);
            setIsSubmitting(false)
            Swal.fire({
                icon: "error",
                title: "Failed to create blog",
                text: error.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-red-800">Add New Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label font-semibold text-red-400">Blog Title</label>
                    <input
                        type="text"
                        placeholder="Enter blog title"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-semibold text-red-400">Thumbnail Image</label>
                    <input
                        type="file"
                        {...register("thumbnail", { required: true })}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label font-semibold text-red-400">Blog Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                        className="text-gray-400"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-red-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
