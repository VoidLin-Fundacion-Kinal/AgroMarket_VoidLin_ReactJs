"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  HomeIcon as House,
  PackageSearch,
  Truck,
  TableIcon as TableOfContents,
  Users,
  FileBox,
  MessageSquareText,
  Receipt,
  ShoppingCart,
  Menu,
  X,
  BoxIcon,
  LogOut,
  User,
} from "lucide-react"
import imgLogo from "../../assets/logoAgroMarket.png"

const NavBarAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigateToPage = (page) => {
    if (page === "/home" || page === "/") {
      navigate(page)
    } else {
      navigate("/dashboardAdmin" + page) 
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const isActivePage = (page) => {
    return location.pathname === `/dashboardAdmin${page}`
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navigationItems = [
    { name: "Home", path: "/home", icon: House },
    { name: "Products", path: "/products", icon: PackageSearch },
    { name: "Providers", path: "/providers", icon: Truck },
    { name: "Categories", path: "/categories", icon: TableOfContents },
    { name: "Users", path: "/user", icon: Users },
    { name: "Invoices", path: "/invoices", icon: Receipt },
    { name: "Carts", path: "/carts", icon: ShoppingCart },
    { name: "Blog", path: "/blog", icon: MessageSquareText },
    { name: "Inventory", path: "/inventory", icon: BoxIcon },
  ]

  const NavItem = ({ item, isMobile = false }) => {
    const Icon = item.icon
    const isActive = isActivePage(item.path)

    if (isMobile) {
      return (
        <li
          className={`group cursor-pointer rounded-xl transition-all duration-300 ${
            isActive 
              ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg" 
              : "hover:bg-gradient-to-r hover:from-green-600/80 hover:to-emerald-600/80 hover:shadow-md"
          }`}
          onClick={() => handleNavigateToPage(item.path)}
        >
          <div className="flex items-center p-4 space-x-3">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? "bg-white/20 shadow-md" 
                : "bg-white/10 group-hover:bg-white/20 group-hover:shadow-md"
            }`}>
              <Icon className={`transition-all duration-300 ${
                isActive ? "text-white" : "text-green-100 group-hover:text-white"
              }`} size={20} />
            </div>
            <span className={`font-semibold transition-all duration-300 ${
              isActive ? "text-white" : "text-green-100 group-hover:text-white"
            }`}>
              {item.name}
            </span>
          </div>
        </li>
      )
    }

    return (
      <div
        className={`group cursor-pointer px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-r from-white/25 to-white/15 shadow-lg backdrop-blur-sm border border-white/20" 
            : "hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 hover:shadow-md hover:border hover:border-white/10"
        }`}
        onClick={() => handleNavigateToPage(item.path)}
      >
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          <div className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
            isActive 
              ? "bg-white/20 shadow-md" 
              : "bg-white/10 group-hover:bg-white/20 group-hover:shadow-md"
          }`}>
            <Icon className={`transition-all duration-300 ${
              isActive ? "text-white" : "text-white/90 group-hover:text-white"
            }`} size={16} />
          </div>
          <span className={`font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base ${
            isActive ? "text-white" : "text-white/90 group-hover:text-white"
          }`}>
            {item.name}
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-2xl border-b border-green-400/30 sticky top-0 z-50">
        <nav className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => handleNavigateToPage("/home")}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 sm:p-2 group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <img 
                  src={imgLogo} 
                  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain" 
                  alt="AgroMarket Logo" 
                />
              </div>
              <span className="ml-2 sm:ml-3 text-white font-bold text-sm sm:text-lg lg:text-xl hidden sm:block">AgroMarket</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
              {navigationItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-3">
              
              
              <button
                onClick={handleLogout}
                className="p-1 sm:p-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-white" size={20} />
              ) : (
                <Menu className="text-white" size={20} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-gradient-to-b from-green-500/95 to-green-600/95 backdrop-blur-sm border-t border-green-400/30 shadow-2xl">
            <div className="px-4 py-6">
              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-white/10 rounded-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Administrador</p>
                  <p className="text-green-100 text-sm">Panel de Control</p>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.path} item={item} isMobile={true} />
                ))}
              </ul>

              {/* Mobile Logout Button */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default NavBarAdmin
