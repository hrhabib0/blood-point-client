import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHandHoldingHeart, FaHome, FaTint, FaUser } from 'react-icons/fa';

const DashboardLayout = () => {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar bg-base-300 w-full lg:hidden">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="mx-2 flex-1 px-2">Dashboard</div>
                        </div>
                        {/* Page content here */}
                        <Outlet></Outlet>
                        {/* Page content here */}
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* mobile Sidebar content here */}
                            <div>
                                <Link to="/" className="text-xl font-bold text-white">
                                    <span className="text-white">🩸 BloodPoint</span>
                                </Link>
                            </div>
                            <li>
                                <NavLink to="/dashboard">
                                    <FaHome className="inline mr-2" />Home
                                </NavLink>
                            </li>
                            {/* rolebased links will be here */}


                            <li>
                                <NavLink to="/dashboard/profile">
                                    <FaUser className="inline mr-2" />Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-red-50 text-red-800 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
                            <FaTint className="text-red-500" />
                            BloodPoint
                        </Link>
                    </div>
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline mr-2" />Home
                        </NavLink>
                    </li>
                    {/* rolebased links will be here */}


                    <li>
                        <NavLink to="/dashboard/create-donation-request">
                            <FaHandHoldingHeart className="inline mr-2" />Create Donation Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/profile"
                        >
                            <FaUser className="inline mr-2" />Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;