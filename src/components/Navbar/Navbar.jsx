import { use } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
// import FastDropLogo from '../FastDropLogo/FastDropLogo';
// import { AuthContext } from '../../contexts/AuthContexts/AuthContext';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)
    const navigate = useNavigate();
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
        <li><NavLink to={'/'}>Home</NavLink></li>
        {/* {
            user && <><li><NavLink to={'/dashboard'}>Dashboard</NavLink></li></>
        }
        <li><NavLink to={'/about'}>About</NavLink></li> */}
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
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

                    <div>
                        {/* <FastDropLogo></FastDropLogo> */}
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    {
                        user ? <button onClick={handleLogOut} className='btn btn-soft btn-success'>Log Out</button> :
                            <>
                                <Link to={'/login'} className="btn btn-soft btn-success">Log In</Link>
                                <Link to={'/register'} className="btn btn-success">Register</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;