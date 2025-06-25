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
  User,
  Home,
  FileText,
  Phone,
} from "lucide-react"
import { getUserRequest } from "../../services/api"

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setIsLoggedIn(true)
        setRole(decoded.role)
        obtenerDatosUsuario()
      } catch (error) {
        console.error("Error decoding token:", error)
        setIsLoggedIn(false)
        setRole("")
        setUserData(null)
      }
    } else {
      setIsLoggedIn(false)
      setRole("")
      setUserData(null)
    }
  }

  const obtenerDatosUsuario = async () => {
    try {
      const user = await getUserRequest()
      setUserData(user)
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setRole("")
    setUserData(null)
    setShowMenu(false)
    setShowMobileMenu(false)
    navigate("/")
  }

  return (
    <nav className="bg-gradient-to-r from-white via-green-50/30 to-white border-b-2 border-green-200/50 py-4 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

        <Link to="/" className="flex items-center group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 p-3 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 border border-green-200/50">
            <img
              src={imgLogo}
              className="h-16 sm:h-18 transition-transform duration-500 group-hover:scale-110"
              alt="AgroMarket Logo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/catalog" 
            className="group flex items-center text-green-800 hover:text-green-600 transition-all duration-300 font-medium hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Productos
          </Link>
          <Link 
            to="/blog" 
            className="group flex items-center text-green-800 hover:text-green-600 transition-all duration-300 font-medium hover:scale-105"
          >
            <FileText className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="group flex items-center text-green-800 hover:text-green-600 transition-all duration-300 font-medium hover:scale-105"
          >
            <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Contacto
          </Link>

          {isLoggedIn && (
            <button
              onClick={() => navigate("/cart")}
              className="group relative p-3 bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 hover:from-green-200 hover:via-emerald-200 hover:to-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-green-200/50"
              title="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-green-700 group-hover:text-green-800 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>
          )}

          {role === "ADMINPLATAFORM" && (
            <Link
              to="/dashboardAdmin"
              className="group flex items-center bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <LayoutDashboard className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="group flex items-center focus:outline-none p-1 rounded-2xl bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 hover:from-green-200 hover:via-emerald-200 hover:to-green-200 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-green-200/50"
              >
                <img
                  src={`http://localhost:2003/images/profileImages/${userData?.profilePhoto || 'Avatar-Default.jpg'}`}
                  className="w-12 h-12 rounded-xl border-3 border-green-500 group-hover:border-green-600 transition-all duration-300 group-hover:scale-110"
                  alt="Avatar"
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white border-2 border-green-200 shadow-2xl rounded-2xl z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-green-200">
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:2003/images/profileImages/${userData?.profilePhoto || 'Avatar-Default.jpg'}`}
                        className="w-10 h-10 rounded-lg border-2 border-green-300"
                        alt="Avatar"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-green-800 text-sm">
                          {userData?.name} {userData?.surname}
                        </p>
                        <p className="text-green-600 text-xs">@{userData?.username}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <Link
                      to="/account/settings"
                      className="group flex items-center px-4 py-3 text-sm text-green-800 hover:bg-green-100 rounded-xl transition-all duration-200"
                    >
                      <Settings className="mr-3 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                      Ajustes de cuenta
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="group flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-100 rounded-xl transition-all duration-200"
                    >
                      <LogOut className="mr-3 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/auth/login"
                className="group flex items-center text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                <User className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Iniciar Sesión
              </Link>
              <Link
                to="/auth/register"
                className="group flex items-center text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                <User className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Registrarse
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden flex items-center p-3 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 shadow-lg"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} className="text-green-700" /> : <Menu size={24} className="text-green-700" />}
        </button>

        {showMobileMenu && (
          <div className="w-full mt-4 md:hidden bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-6 border-2 border-green-200/50 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col items-start space-y-4">
              <Link 
                to="/catalog" 
                className="group flex items-center w-full text-green-800 hover:text-green-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-green-100/50"
              >
                <ShoppingBag className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Productos
              </Link>
              <Link 
                to="/blog" 
                className="group flex items-center w-full text-green-800 hover:text-green-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-green-100/50"
              >
                <FileText className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="group flex items-center w-full text-green-800 hover:text-green-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-green-100/50"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Contacto
              </Link>

              {isLoggedIn && (
                <button
                  onClick={() => navigate("/cart")}
                  className="group flex items-center w-full text-green-800 hover:text-green-600 p-3 rounded-xl hover:bg-green-100/50 transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Carrito</span>
                </button>
              )}

              {role === "ADMINPLATAFORM" && (
                <Link 
                  to="/dashboardAdmin" 
                  className="group flex items-center w-full text-green-800 hover:text-green-600 p-3 rounded-xl hover:bg-green-100/50 transition-all duration-300 font-medium"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <>
                  <Link 
                    to="/account/settings" 
                    className="group flex items-center w-full text-green-800 hover:text-green-600 p-3 rounded-xl hover:bg-green-100/50 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Ajustes
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center w-full text-red-700 hover:text-red-800 p-3 rounded-xl hover:bg-red-100/50 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col w-full space-y-3 pt-2">
                  <Link
                    to="/auth/login"
                    className="group flex items-center justify-center text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                  >
                    <User className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/auth/register"
                    className="group flex items-center justify-center text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                  >
                    <User className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
