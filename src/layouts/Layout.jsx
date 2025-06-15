// src/components/Layout.jsx
import React from 'react';
import Navbar from './../components/Navbar/Navbar.jsx';
import Footer from './../components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <Outlet /> {/* Aquí se renderizan Home, Catalog, etc. */}
      </main>
      <Footer />
    </div>
  );
};


export default Layout;