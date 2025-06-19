import Footer from "./../components/Footer/Footer.jsx"
import { Outlet } from "react-router-dom"
import NavBarAdmin from "../components/Navbar/NavBarAdmin.jsx"

const Layout2 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar con sombra para separación */}
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
        <NavBarAdmin />
      </header>

      {/* Contenido principal con contraste */}
      <main className="flex-grow relative">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>

        {/* Container del contenido */}
        <div className="relative z-10 min-h-[calc(100vh-128px)] p-4 md:p-6 lg:p-8">
          {/* Card container para el contenido de las rutas */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[calc(100vh-160px)] overflow-hidden">
              {/* Header decorativo opcional */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              {/* Contenido de las rutas hijas */}
              <div className="p-6 md:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos de fondo */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-20 blur-xl"></div>
      </main>

      {/* Footer con separación visual */}
      <footer className="bg-white border-t border-gray-200 shadow-lg mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout2
