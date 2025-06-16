import React from 'react';
import Navbar from './../components/Navbar/Navbar.jsx';
import Footer from './../components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Ajuste importante aquí */}
      <main className="flex-grow">
        <div className="min-h-[calc(100vh-64px-64px)]"> {/* Ajusta 64px al alto de tu Navbar y Footer */}
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
