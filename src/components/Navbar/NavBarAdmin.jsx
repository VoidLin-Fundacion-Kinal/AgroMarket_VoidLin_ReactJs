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
} from "lucide-react"
import imgLogo from "../../assets/logoAgroMarket.png"

const NavBarAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleNavigateToPage = (page) => {
    navigate("/dashboardAdmin" + page)
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  const isActivePage = (page) => {
    return location.pathname === `/dashboardAdmin${page}`
  }

  // Cerrar menú móvil al cambiar el tamaño de pantalla
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
    { name: "Inventory", path: "/inventory", icon: FileBox },
    { name: "Invoices", path: "/invoices", icon: Receipt },
    { name: "Carts", path: "/carts", icon: ShoppingCart },
    { name: "Blog", path: "/blog", icon: MessageSquareText },
  ]

  const NavItem = ({ item, isMobile = false }) => {
    const Icon = item.icon
    const isActive = isActivePage(item.path)

    if (isMobile) {
      return (
        <li
          className={`group cursor-pointer rounded-xl transition-all duration-200 ${
            isActive ? "bg-green-600 shadow-lg" : "hover:bg-green-600/80 hover:shadow-md"
          }`}
          onClick={(e) => {
            e.preventDefault()
            handleNavigateToPage(item.path)
          }}
        >
          <div className="flex items-center p-4 space-x-3">
            <Icon
              className={`transition-colors duration-200 ${
                isActive ? "text-white" : "text-green-700 group-hover:text-white"
              }`}
              size={20}
            />
            <span
              className={`font-semibold transition-colors duration-200 ${
                isActive ? "text-white" : "text-green-700 group-hover:text-white"
              }`}
            >
              {item.name}
            </span>
          </div>
        </li>
      )
    }

    return (
      <div
        className={`group cursor-pointer px-4 py-2 rounded-xl transition-all duration-200 ${
          isActive ? "bg-white/20 shadow-lg backdrop-blur-sm" : "hover:bg-white/10 hover:shadow-md"
        }`}
        onClick={(e) => {
          e.preventDefault()
          handleNavigateToPage(item.path)
        }}
      >
        <div className="flex items-center space-x-2">
          <span
            className={`font-semibold transition-colors duration-200 ${
              isActive ? "text-white" : "text-white/90 group-hover:text-white"
            }`}
          >
            {item.name}
          </span>
          <Icon
            className={`transition-colors duration-200 ${
              isActive ? "text-white" : "text-white/90 group-hover:text-white"
            }`}
            size={18}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Navbar principal */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-xl border-b border-green-400/30">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={(e) => {
                e.preventDefault()
                handleNavigateToPage("/home")
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 group-hover:bg-white/20 transition-all duration-200">
                <img src={imgLogo || "/placeholder.svg"} className="h-8 sm:h-10 md:h-12 w-auto" alt="AgroMarket Logo" />
              </div>
              <span className="ml-3 text-white font-bold text-xl hidden sm:block">AgroMarket</span>
            </div>

            {/* Navegación Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigationItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>

            {/* Botón menú móvil */}
            <button
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="text-white" size={24} /> : <Menu className="text-white" size={24} />}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-b from-green-500/95 to-green-600/95 backdrop-blur-sm border-t border-green-400/30">
            <ul className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.path} item={item} isMobile={true} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default NavBarAdmin
