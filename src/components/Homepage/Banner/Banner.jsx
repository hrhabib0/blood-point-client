import { Link } from 'react-router';
import { FaHandHoldingHeart, FaSearchLocation } from 'react-icons/fa';
import bannerImage from '../../../assets/images/banner.jpg'

const Banner = () => {
    return (
        <div className="relative min-h-[90vh] bg-base-100 flex items-center justify-center overflow-hidden py-4 md:py-0">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src={bannerImage}
                    alt="Blood Donation"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            {/* Overlay content */}
            <div className="relative z-10 text-center px-4 md:px-10">
                <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-6 leading-tight">
                    Give Blood, Save Lives
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
                    “A single pint can save three lives, a single gesture can create a million smiles.”
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/register" className="btn bg-white text-red-700 hover:bg-red-100 border-none">
                        <FaHandHoldingHeart className="text-lg" /> Join as a Donor
                    </Link>
                    <Link to="/searchDonor" className="btn bg-red-700 text-white hover:bg-red-800 border-none">
                        <FaSearchLocation className="text-lg" /> Search Donors
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
