import { use, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `log out successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login')
            })
            .catch(error => {
                console.log(error)
            })
    }
    const navlinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-white bg-red-600 px-3 py-2 rounded font-semibold"
                        : "text-white hover:bg-red-500 px-3 py-2 rounded transition"
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/requests"
                className={({ isActive }) =>
                    isActive
                        ? "text-white bg-red-600 px-3 py-2 rounded font-semibold"
                        : "text-white hover:bg-red-500 px-3 py-2 rounded transition"
                }
            >
                Donation Requests
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blogs"
                className={({ isActive }) =>
                    isActive
                        ? "text-white bg-red-600 px-3 py-2 rounded font-semibold"
                        : "text-white hover:bg-red-500 px-3 py-2 rounded transition"
                }
            >
                Blogs
            </NavLink>
        </li>
        {user && (
            <NavLink
                to="/funding"
                className={({ isActive }) =>
                    isActive
                        ? "text-white bg-red-600 px-3 py-2 rounded font-semibold"
                        : "text-white hover:bg-red-500 px-3 py-2 rounded transition"
                }
            >
                Funding
            </NavLink>
        )}
    </>
    return (
        <div className='bg-red-700 shadow-lg text-white'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start"> 
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navlinks}
                        </ul>
                    </div>
                    {/* Logo */}
                    <div>
                        <Link to="/" className="text-xl font-bold text-white">
                            <span className="text-white">🩸 BloodPoint</span>
                        </Link>
                    </div>
                </div>
                {/* desktop navbar */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {!user ? (
                        <Link
                            to="/login"
                            className="bg-white text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/7G5Xz7y/avatar-placeholder.png"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <FaChevronDown className="text-white text-sm" />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-md z-50">
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-red-100 transition"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogOut();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-red-100 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;


