"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import imgLogo from "../../assets/logoAgroMarket.png"
import {
  LogOut,
  Settings,
  ShoppingBag,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setIsLoggedIn(true)
        setRole(decoded.role)
      } catch (error) {
        console.error("Error decoding token:", error)
        setIsLoggedIn(false)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <nav className="bg-white border-b-2 border-green-100/50 py-3 shadow-lg sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-2 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <img
              src={imgLogo}
              className="h-16 sm:h-16 transition-transform duration-300 group-hover:scale-110"
              alt="AgroMarket Logo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/catalog" className="text-green-800 hover:text-green-600 transition">
            Productos
          </Link>
          <Link to="/blog" className="text-green-800 hover:text-green-600 transition">
            Blog
          </Link>
          <Link to="/contact" className="text-green-800 hover:text-green-600 transition">
            Contacto
          </Link>

          {isLoggedIn && (
            <button
              onClick={() => navigate("/cart")}
              className="group relative p-3 bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              title="Carrito de compras"
            >
              <ShoppingBag />
            </button>
          )}

          {role === "ADMINPLATAFORM" && (
            <Link
              to="/dashboardAdmin"
              className="group flex items-center bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-800 px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 shadow-md"
            >
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
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
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border-2 border-green-200 shadow-2xl rounded-2xl z-50">
                  <div className="p-2">
                    <Link
                      to="/account/settings"
                      className="group flex items-center px-4 py-3 text-sm text-green-800 hover:bg-green-100 rounded-xl transition"
                    >
                      <Settings className="mr-2" />
                      Ajustes de cuenta
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="group flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-100 rounded-xl transition"
                    >
                      <LogOut className="mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl transition transform hover:scale-105"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/auth/register"
                className="text-white bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-xl transition transform hover:scale-105"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2 rounded text-green-800"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="w-full mt-4 md:hidden flex flex-col items-start space-y-4 bg-white rounded-xl p-4 border-t border-green-100 shadow-lg">
            <Link to="/catalog" className="text-green-800 hover:text-green-600 transition">
              Productos
            </Link>
            <Link to="/blog" className="text-green-800 hover:text-green-600 transition">
              Blog
            </Link>
            <Link to="/contact" className="text-green-800 hover:text-green-600 transition">
              Contacto
            </Link>

            {isLoggedIn && (
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center space-x-2 text-green-800 hover:text-green-600"
              >
                <ShoppingBag />
                <span>Carrito</span>
              </button>
            )}

            {role === "ADMINPLATAFORM" && (
              <Link to="/dashboardAdmin" className="text-green-800 hover:text-green-600">
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link to="/account/settings" className="text-green-800 hover:text-green-600">
                  Ajustes
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-700 hover:text-red-800"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
