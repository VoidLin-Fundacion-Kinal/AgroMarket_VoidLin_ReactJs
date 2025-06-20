// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="w-2/12 mr-6">
      <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
        <MenuItem icon="dashboard" text="Home" onClick={() => onMenuClick('home')} />
        <MenuItem icon="tune" text="Cart" onClick={() => onMenuClick('cart')} />
        <MenuItem icon="file_copy" text="Bills" onClick={() => onMenuClick('bills')} />

      </div>

      <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
        <MenuItem icon="face" text="Edit Profile" onClick={() => onMenuClick('edit')} />
        <MenuItem icon="settings" text="New Post" onClick={() => onMenuClick('newpost')} />

        <MenuItem icon="power_settings_new" text="Log out" />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="inline-block text-gray-600 hover:text-black my-4 w-full text-left"
  >
    <span className="material-icons-outlined float-left pr-2">{icon}</span>
    {text}
    <span className="material-icons-outlined float-right">keyboard_arrow_right</span>
  </button>
);

export default Sidebar;
