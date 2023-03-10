import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User Logout Successfully')
                navigate('/');
            })
            .catch(error => console.log(error.message))
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><p>{user?.displayName ? user?.displayName : user?.email}</p></li>
                    <li> <button onClick={handleLogOut} >LogOut</button></li>
                </>
                : <li><Link to="/login">Login</Link></li>
        }
    </React.Fragment>

    return (
        <div>
            <div className="navbar bg-base-100 justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold ">Doctors Appointment</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

            </div>
        </div>
    );
};

export default Navbar;