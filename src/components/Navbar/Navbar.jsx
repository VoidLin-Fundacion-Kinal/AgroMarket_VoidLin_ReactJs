import React from 'react';
import { Link } from 'react-router-dom';
import imgLogo from '../../assets/logoAgroMarket.png';

const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 py-2.5">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link to="/" className="flex items-center">
                    <img src={imgLogo} className="h-20 mr-3 sm:h-20" alt="AgroMarket Logo" />
                </Link>

                <div className="flex items-center lg:order-2">
                    <Link
                        to="/auth/login"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                        Iniciar Sesión
                    </Link>

                    <Link
                        to="/auth/register"
                        className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                    >
                        Registrate
                    </Link>

                    <button data-collapse-toggle="mobile-menu-2" type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu-2" aria-expanded="true">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-5 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0" aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="block py-2 pl-3 pr-4 text-gray-700 hover:text-green-700 lg:p-0">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog" className="block py-2 pl-3 pr-4 text-gray-700 hover:text-green-700 lg:p-0">
                                Marketplace
                            </Link>
                        </li>
                       
                        <li>
                            <Link to="/team" className="block py-2 pl-3 pr-4 text-gray-700 hover:text-green-700 lg:p-0">
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block py-2 pl-3 pr-4 text-gray-700 hover:text-green-700 lg:p-0">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
