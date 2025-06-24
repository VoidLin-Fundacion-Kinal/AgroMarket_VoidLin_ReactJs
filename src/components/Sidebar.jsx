import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-2/12 mr-6">
      <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
        
        <Link to="/account/settings">
          <MenuItem icon="home" text="Home" />
        </Link>

        <Link to="/account/settings/cartUser">
          <MenuItem icon="shopping_cart" text="Cart"  />
        </Link>

        <Link to="/account/settings/bills">
          <MenuItem icon="receipt" text="Bills"  />
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
        <Link to="/account/settings/edit">
          <MenuItem icon="face" text="Edit Profile" />
        </Link>
        
        <Link to="/account/settings/newpost">
          <MenuItem icon="add" text="New Post" />
        </Link>

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
