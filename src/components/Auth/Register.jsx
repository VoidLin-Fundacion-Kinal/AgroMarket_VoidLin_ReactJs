import React, { useState } from 'react';
import imageLogo from '../../assets/logoAgroMarket.png';
import bgImage from '../../assets/bg-login.png';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useRegister } from './../../hooks/useRegister.jsx';

export const Register = ({ onSwitch }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    cui: '',
    nit: ''
  });

  const { register, isLoading } = useRegister();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return toast.error('Por favor completa todos los campos antes de continuar.');
    }

    try {
      await register(formData);

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usuario creado satisfactoriamente, Inicie sesión.',
      });

      setFormData({
        name: '',
        surname: '',
        username: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        cui: '',
        nit: ''
      });
      setStep(1);

    } catch (error) {
      console.error('Error al registrar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: error.message || 'Ocurrió un error al intentar registrar el usuario. Intente de nuevo.',
      });
    }
  };



  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const validateStep = () => {
    if (step === 1) {
      return formData.name && formData.surname && formData.username && formData.phone;
    }
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return formData.address && formData.email && emailRegex.test(formData.email) && formData.password;
    }
    if (step === 3) {
      return formData.cui && formData.nit;
    }
    return false;
  };


  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="bg-stone-50 rounded-xl w-40 h-40 mr-2 p-4" src={imageLogo} alt="logo" />
        </a>

        <div className="w-full rounded-xl sm:max-w-md xl:p-0 bg-stone-50">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Registro
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <Input name="name" label="Nombre" value={formData.name} onChange={handleChange} placeholder="Juan" />
                  <Input name="surname" label="Apellido" value={formData.surname} onChange={handleChange} placeholder="Pérez" />
                  <Input name="username" label="Nickname" value={formData.username} onChange={handleChange} placeholder="JP" />
                  <Input name="phone" onlyNumbers maxLength={8} label="Teléfono" value={formData.phone} onChange={handleChange} prefix="+502" placeholder="12345678" />

                  <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                    ¿Ya tienes cuenta? <a href="#" onClick={onSwitch} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesión</a>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <Input name="address" label="Dirección" value={formData.address} onChange={handleChange} placeholder="Guatemala City" required />
                  <Input name="email" label="Correo electrónico" type="email" value={formData.email} onChange={handleChange} placeholder="example@domain.com" />
                  <Input name="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                </>
              )}

              {step === 3 && (
                <>
                  <Input name="cui" label="CUI" onlyNumbers maxLength={13} value={formData.cui} onChange={handleChange} placeholder="1234567890101" />
                  <Input name="nit" label="NIT" onlyNumbers maxLength={10} value={formData.nit} onChange={handleChange} placeholder="7845126" />
                </>
              )}

              {/* Botones */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                    Atrás
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep()) {
                        nextStep();
                      } else {
                        toast.error('Por favor completa todos los campos antes de continuar.');
                      }
                    }}
                    className="ml-auto bg-green-700 hover:bg-emerald-400 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Siguiente
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto bg-green-700 hover:bg-emerald-400 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    {isLoading ? 'Registrando...' : 'Registrar'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ name, label, value, onChange, type = 'text', placeholder, prefix, onlyNumbers, maxLength }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2.5">
      {prefix && <span className="text-gray-700 mr-2">{prefix}</span>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (onlyNumbers && !/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault();
          }
        }}
        className="bg-transparent outline-none w-full text-stone-950"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);
