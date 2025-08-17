import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import bannerImage from '../../../assets/images/banner.jpg'
import Swal from "sweetalert2";

const ContactUs = () => {
    const handleSendMessage = e => {
        e.preventDefault()
        const form = e.target;
        // Show timed alert
        Swal.fire({
            title: 'Message Sent!',
            text: "We'll get back to you soon.",
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            toast: false,
            position: 'center',
        });
        form.reset();
    }
    return (
        <div
            className="bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-20"
            id="contact"
            data-aos="fade-up"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-2">
                Contact Us
            </h2>
            <p className="text-center text-gray-900 dark:text-gray-50 mb-10">
                We'd love to hear from you. Fill out the form or call us directly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Contact Form */}
                <form className="space-y-4" onSubmit={handleSendMessage}>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full bg-gray-100 text-gray-500"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button className="btn bg-red-600 text-white hover:bg-red-700 w-full">
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="space-y-6 text-gray-900 dark:text-gray-50">
                    <div className="flex items-center gap-4">
                        <FaPhoneAlt className="text-red-600 text-xl" />
                        <span className="text-lg font-medium">+880 1234 567 890</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-red-600 text-xl" />
                        <span className="text-lg font-medium">support@bloodpoint.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-red-600 text-xl" />
                        <span className="text-lg font-medium">
                            Dhanmondi, Dhaka, Bangladesh
                        </span>
                    </div>

                    <div className="mt-10">
                        <img
                            src={bannerImage}
                            alt="Contact Illustration"
                            className="w-full max-w-sm rounded-lg shadow-md hidden md:block"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
