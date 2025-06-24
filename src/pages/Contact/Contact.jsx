import { Clock, MapPin, Phone } from 'lucide-react'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sweetConfirm = () => {
        Swal.fire({
            title: "¡Gracias por tu mensaje!",
            text: "Tu mensaje ha sido enviado correctamente.",
            icon: "success",
            confirmButtonColor: '#027333',
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                setName('');
                setEmail('');
                setMessage('');
            }
        });
    }

    return (
        <section className="min-h-screen bg-white dark:bg-green-950 text-green-900 dark:text-green-100 px-4 md:px-10 py-8">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                {/* Encabezado */}
                <div className="mb-6 max-w-3xl text-center md:mx-auto md:mb-12">
                    <h2 className="font-heading mb-4 font-bold tracking-tight text-[#027333] dark:text-[#3FBF48] text-3xl sm:text-5xl">
                        Contáctanos
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-700 dark:text-gray-300">
                        Comparte cualquier pregunta, comentario o inquietud que tengas. Estamos aquí para ayudarte.
                    </p>
                </div>

                {/* Contenido principal */}
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Información */}
                        <div>
                            <p className="mb-10 text-lg text-gray-700 dark:text-gray-300">
                                Somos un equipo apasionado por conectar a los productores agrícolas con los consumidores. Si tienes alguna pregunta, comentario o simplemente quieres saludar, no dudes en contactarnos.
                            </p>
                            <ul className="space-y-6">
                                {/* Dirección */}
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#027333] text-white">
                                        <MapPin />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-[#027333] dark:text-[#3FBF48]">Dirección</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Guatemala City</p>
                                        <p className="text-gray-700 dark:text-gray-300">Ciudad Cayalá, Zona 16</p>
                                    </div>
                                </li>
                                {/* Teléfono */}
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#027333] text-white">
                                        <Phone />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-[#027333] dark:text-[#3FBF48]">Teléfono</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Número: +502 6678-4510</p>
                                        <p className="text-gray-700 dark:text-gray-300">Correo: support@agromarket.gt</p>
                                    </div>
                                </li>
                                {/* Horario */}
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#027333] text-white">
                                        <Clock />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-[#027333] dark:text-[#3FBF48]">Horario laboral</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Lunes - Viernes: 08:00 - 17:00</p>
                                        <p className="text-gray-700 dark:text-gray-300">Sábado y Domingo: 08:00 - 12:00</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Formulario */}
                        <div className="bg-[#f8f8f8] dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
                            <h2 className="mb-4 text-2xl font-bold text-[#F25D27] dark:text-[#F25D27]">¿Qué te pareció la experiencia?</h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3FBF48]"
                                />
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3FBF48]"
                                />
                                <textarea
                                    placeholder="Escribe tu mensaje..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="5"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3FBF48]"
                                ></textarea>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={sweetConfirm}
                                    className="w-full bg-[#038C33] hover:bg-[#027333] text-white font-semibold py-3 px-6 rounded-md transition duration-200"
                                >
                                    Enviar ✅
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
