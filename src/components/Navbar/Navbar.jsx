    "use client"

    import { useEffect, useState } from "react"
    import { Link, useNavigate } from "react-router-dom"
    import imgLogo from "../../assets/logoAgroMarket.png"
    import { LogOut, Settings, ShoppingBag } from "lucide-react"

    const Navbar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    return (
        <nav className="bg-gradient-to-r from-white via-green-50/30 to-white border-b-2 border-green-100/50 py-3 shadow-lg backdrop-blur-sm sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <Link to="/" className="flex items-center group">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-2 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <img
                src={imgLogo || "/placeholder.svg"}
                className="h-16 sm:h-16 transition-transform duration-300 group-hover:scale-110"
                alt="AgroMarket Logo"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </div>
            </Link>

            <div className="flex items-center lg:order-2 space-x-3">
            {isLoggedIn ? (
                <>
                <button
                    onClick={() => navigate("/cart")}
                    className="group relative p-3 bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    title="Carrito de compras"
                >
                    <ShoppingBag />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold"></span>
                    </div>
                </button>

                <div className="relative">
                    <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="group flex items-center focus:outline-none p-1 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                    <img
                        src="http://localhost:2003/images/Avatar-Default.jpg"
                        className="w-12 h-12 rounded-full border-3 border-green-500 group-hover:border-green-600 transition-colors duration-300"
                        alt="Avatar"
                    />
                    <svg
                        className={`w-4 h-4 ml-2 text-green-700 transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>

                    {showMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-white via-green-50/30 to-white border-2 border-green-200/50 shadow-2xl rounded-2xl z-50 backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>

                        <div className="p-2">
                        <Link
                            to="/account/settings"
                            className="group flex items-center px-4 py-3 text-sm text-green-800 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <Settings />
                            
                            Ajustes de cuenta
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="group flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <LogOut />
                            Cerrar sesión
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                </>
            ) : (
                <>
                <Link
                    to="/auth/login"
                    className="group relative text-white bg-gradient-to-r from-green-600 via-green-700 to-green-600 hover:from-green-700 hover:via-green-800 hover:to-green-700 focus:ring-4 focus:ring-green-300 font-semibold rounded-xl text-sm px-6 py-3 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                >
                    <span className="relative z-10">Iniciar Sesión</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Link>

                <Link
                    to="/auth/register"
                    className="group relative text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 font-semibold rounded-xl text-sm px-6 py-3 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                >
                    <span className="relative z-10">Registrate</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Link>
                </>
            )}

            <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="inline-flex items-center p-3 text-green-700 rounded-xl lg:hidden hover:bg-gradient-to-br hover:from-green-100 hover:to-emerald-100 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                aria-controls="mobile-menu-2"
                aria-expanded={showMobileMenu}
            >
                <svg
                className={`w-6 h-6 transition-transform duration-300 ${showMobileMenu ? "rotate-90" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                ></path>
                </svg>
            </button>
            </div>

            <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300 ${showMobileMenu ? "block" : "hidden lg:block"}`}
            id="mobile-menu-2"
            >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-2 lg:mt-0 bg-gradient-to-br from-white/90 to-green-50/90 lg:bg-transparent rounded-2xl lg:rounded-none p-4 lg:p-0 shadow-lg lg:shadow-none backdrop-blur-sm lg:backdrop-blur-none">
                <li>
                <Link
                    to="/"
                    className="group block py-3 px-4 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl lg:bg-transparent lg:text-green-700 lg:p-3 lg:hover:bg-gradient-to-r lg:hover:from-green-100 lg:hover:to-emerald-100 lg:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md lg:shadow-none hover:shadow-lg"
                >
                    <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    Home
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/blog"
                    className="group block py-3 px-4 text-gray-700 hover:text-green-700 lg:p-3 lg:hover:bg-gradient-to-r lg:hover:from-green-100 lg:hover:to-emerald-100 lg:rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                    <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                    </svg>
                    Blog
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/catalog"
                    className="group block py-3 px-4 text-gray-700 hover:text-green-700 lg:p-3 lg:hover:bg-gradient-to-r lg:hover:from-green-100 lg:hover:to-emerald-100 lg:rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                    <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    Marketplace
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/team"
                    className="group block py-3 px-4 text-gray-700 hover:text-green-700 lg:p-3 lg:hover:bg-gradient-to-r lg:hover:from-green-100 lg:hover:to-emerald-100 lg:rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                    <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                    </svg>
                    Team
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/contact"
                    className="group block py-3 px-4 text-gray-700 hover:text-green-700 lg:p-3 lg:hover:bg-gradient-to-r lg:hover:from-green-100 lg:hover:to-emerald-100 lg:rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                    <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    Contact
                    </span>
                </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
    }

    export default Navbar
