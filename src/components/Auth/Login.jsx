import React, { useState } from 'react';
import imageLogo from '../../assets/logoAgroMarket.png';
import bgImage from '../../assets/bg-login.png';
import { useLogin } from './../../hooks/useLogin.jsx'



export const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Imagen de fondo desenfocada */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Contenido encima de la imagen */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="bg-stone-50 rounded-xl w-40 h-40 mr-2 p-4" src={imageLogo} alt="logo" />
        </a>

        <div className="w-full rounded-xl sm:max-w-md xl:p-0 bg-stone-50">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Iniciar Sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-950">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="usuario@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-700 hover:bg-emerald-400 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
              <p className="text-center text-sm font-light text-gray-500">
                ¿No tienes cuenta?{' '}
                <a href="#" onClick={onSwitch} className="font-medium text-green-700 hover:underline">
                  Regístrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
