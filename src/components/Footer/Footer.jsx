import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-red-50 dark:bg-gray-900 text-red-800 dark:text-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & About */}
                <div>
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
                        <FaTint className="text-red-600" />
                        BloodPoint
                    </Link>
                    <p className="mt-2 text-sm">
                        Save lives by donating blood. Join our mission to build a healthier future.
                    </p>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-600"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-600"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-600"><FaInstagram /></a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-red-600"><FaGithub /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-red-600">Home</Link></li>
                        <li><Link to="/donors" className="hover:text-red-600">Search Donors</Link></li>
                        <li><Link to="/register" className="hover:text-red-600">Join as Donor</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/blog" className="hover:text-red-600">Blog</Link></li>
                        <li><Link to="/faq" className="hover:text-red-600">FAQs</Link></li>
                        <li><Link to="/privacy" className="hover:text-red-600">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-red-600">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact Info with Icons */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm flex items-center gap-2">
                        <FaPhone className="text-red-500" /> +880 1234 567890
                    </p>
                    <p className="text-sm flex items-center gap-2 mt-2">
                        <FaEnvelope className="text-red-500" /> support@bloodpoint.com
                    </p>
                    <p className="text-sm flex items-center gap-2 mt-2">
                        <FaMapMarkerAlt className="text-red-500" /> Dhaka, Bangladesh
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-red-200 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} BloodPoint. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;