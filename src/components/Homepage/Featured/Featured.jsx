import { FaBolt, FaHandHoldingHeart, FaHeart, FaUsers } from 'react-icons/fa'

const Featured = () => {
    return (
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-red-50 via-white to-red-100 text-gray-800">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600">Why Donate Blood With Us?</h2>
                <p className="text-base md:text-lg mb-10 text-gray-600">
                    Join our life-saving community and make a real impact. Every drop counts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Trusted Donors */}
                    <div
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-red-100"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <FaHandHoldingHeart className="text-red-500 w-10 h-10 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trusted Donors</h3>
                        <p className="text-sm text-gray-600">All donors are verified and reviewed for safety.</p>
                    </div>

                    {/* Lives Saved */}
                    <div
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <FaUsers className="text-red-500 w-10 h-10 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Thousands Helped</h3>
                        <p className="text-sm text-gray-600">Over 10,000 lives touched through our platform.</p>
                    </div>

                    {/* Become a Hero */}
                    <div
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <FaHeart className="text-red-500 hover:text-white w-10 h-10 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Be a Hero</h3>
                        <p className="text-sm text-gray-600">Step up and save lives in your local community.</p>
                    </div>

                    {/* Seamless Process */}
                    <div
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-red-100"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        <FaBolt className="text-red-500 w-10 h-10 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Simple & Fast</h3>
                        <p className="text-sm text-gray-600">Find or become a donor in just a few clicks.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Featured
