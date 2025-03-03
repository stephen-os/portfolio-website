import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaUser, FaBriefcase, FaFolderOpen, FaEnvelope, FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";

import Logo from "../../assets/images/profile_pic.jpg";

const NavBar = () => {
    const [showNav, setShowNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showNav && isMobile && !e.target.closest('.navbar-container')) {
                setShowNav(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showNav, isMobile]);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className={`navbar-container ${isMobile ? 'mobile-view' : ''}`}>
            {isMobile ? (
                // Mobile header bar
                <div className="fixed top-0 left-0 w-full bg-gray-100 flex justify-between items-center px-2 h-10 z-30 shadow-md">
                    <Link to="/" className="flex items-center" onClick={() => setShowNav(false)}>
                        <img src={Logo} alt="logo" className="w-6 rounded-full" />
                    </Link>

                    <button
                        onClick={toggleNav}
                        className="text-gray-500 hover:text-orange-400 focus:outline-none"
                        aria-label={showNav ? "Close menu" : "Open menu"}
                    >
                        {showNav ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                    {/* Mobile navigation overlay */}
                    {showNav && (
                        <div className="fixed inset-0 top-10 bg-gray-100 z-20 flex flex-col items-center pt-8">
                            <nav className="flex flex-col items-center space-y-6 mb-8">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}`}
                                    onClick={() => setShowNav(false)}
                                >
                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}`}
                                    onClick={() => setShowNav(false)}
                                >
                                    <FaUser />
                                    <span>About</span>
                                </NavLink>
                                <NavLink
                                    to="/experience"
                                    className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}`}
                                    onClick={() => setShowNav(false)}
                                >
                                    <FaBriefcase />
                                    <span>Experience</span>
                                </NavLink>
                                <NavLink
                                    to="/portfolio"
                                    className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}`}
                                    onClick={() => setShowNav(false)}
                                >
                                    <FaFolderOpen />
                                    <span>Portfolio</span>
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}`}
                                    onClick={() => setShowNav(false)}
                                >
                                    <FaEnvelope />
                                    <span>Contact</span>
                                </NavLink>
                            </nav>

                            <ul className="flex space-x-6">
                                <li>
                                    <a href="https://google.com" target="_blank" rel="noreferrer">
                                        <FaLinkedin className="text-gray-500 hover:text-orange-400" size={20} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://google.com" target="_blank" rel="noreferrer">
                                        <FaGithub className="text-gray-500 hover:text-orange-400" size={20} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                // Desktop sidebar
                <div className="bg-gray-100 w-10 h-full fixed top-0 z-30 flex flex-col items-center py-2">
                    <Link className="flex flex-col items-center" to="/">
                        <img src={Logo} alt="logo" className="w-6 mb-2 rounded-full" />
                    </Link>

                    <nav className="flex flex-col items-center mt-26 space-y-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}
                        >
                            <FaHome />
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}
                        >
                            <FaUser />
                        </NavLink>
                        <NavLink
                            to="/experience"
                            className={({ isActive }) => isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}
                        >
                            <FaBriefcase />
                        </NavLink>
                        <NavLink
                            to="/portfolio"
                            className={({ isActive }) => isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}
                        >
                            <FaFolderOpen />
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? 'text-orange-400' : 'text-gray-500 hover:text-orange-400'}
                        >
                            <FaEnvelope />
                        </NavLink>
                    </nav>

                    <ul className="absolute bottom-6 flex flex-col space-y-4">
                        <li>
                            <a href="https://google.com" target="_blank" rel="noreferrer">
                                <FaLinkedin className="text-gray-500 hover:text-orange-400" />
                            </a>
                        </li>
                        <li>
                            <a href="https://google.com" target="_blank" rel="noreferrer">
                                <FaGithub className="text-gray-500 hover:text-orange-400" />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;