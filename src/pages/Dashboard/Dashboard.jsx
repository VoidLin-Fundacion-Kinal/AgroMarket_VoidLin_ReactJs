// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/NavbarDashBoardUser';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import Editar from '../../components/UserEdit/UserEdit';
import CartView from '../../components/Cart/CartView'; // Asegúrate de que esta ruta sea correcta
import BillsView from '../../components/BillsUserView/BillsView';
import NewPostView from '../../components/NewPostView/NewPostView';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('home'); // 'home', 'edit', 'cart'
  const userId = 1; // Ajusta esto según el ID real del usuario

  return (
    <>
      {/* Estilos externos */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.2.0/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />

      <div style={{ backgroundColor: '#f3f4f6' }} className="bg-orange-100 min-h-screen">
        {/* <Navbar /> */}
        <div className="flex flex-row pt-24 px-10 pb-4">
          <Sidebar onMenuClick={setActiveView} />
          <div className="w-10/12">
            {activeView === 'home' && <MainContent />}
            {activeView === 'edit' && (
              <Editar
                userId={userId}
                onCancel={() => setActiveView('home')}
              />
            )}
            {activeView === 'cart' && <CartView />}
            {activeView === 'bills' && <BillsView />}
            {activeView === 'newpost' && <NewPostView onCancel={() => setActiveView('home')} />}


          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
