import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('home'); 
  const userId = 1; 

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.2.0/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />

      <div style={{ backgroundColor: '#f3f4f6' }} className="bg-orange-100 min-h-screen">
        <div className="flex flex-row pt-24 px-10 pb-4">
          <Sidebar onMenuClick={setActiveView} />
          <div className="w-10/12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
