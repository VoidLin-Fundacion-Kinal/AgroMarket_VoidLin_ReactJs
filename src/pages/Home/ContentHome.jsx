import { ChartColumnBig, Package, Store } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import imgHomeOne from '../../assets/bg-home-2.png';


const ContentHome = () => {
    
 

    return (
        <div>
            
            <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">¡Impulsamos el futuro de los Agricultores!</h1>
                    <p className="text-xl md:text-2xl mb-12">Conectamos agricultores, proveedores y compradores en un solo lugar.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/catalog">
                            <button  className="bg-white text-green-800 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 cursor-pointer">Ver Productos</button>
                        </Link>
                        <Link to="/blog">
                        
                            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-800 transition duration-300 cursor-pointer">Ver Blog</button>
                        </Link>
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-green-600 mb-4 flex justify-center items-center">
                                <Store className='w-15 h-15 flex '/>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Compra y venta de productos</h3>
                            <p className="text-gray-600 text-center">Ofrece o encuentra productos agrícolas frescos y de calidad directamente del productor.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-green-600 mb-4 flex justify-center items-center">
                                <Package className='w-15 h-15 flex '/>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Proveedores agropecuarios</h3>
                            <p className="text-gray-600 text-center">Accede a fertilizantes, herramientas, maquinaria y más para mejorar tu producción.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-green-600 mb-4 flex justify-center items-center">
                                <ChartColumnBig className='w-15 h-15 flex '/>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Datos del mercado</h3>
                            <p className="text-gray-600 text-center">Consulta precios, tendencias y estadísticas para tomar decisiones inteligentes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Quiénes somos?</h2>
                            <p className="text-gray-600 mb-4">AgroMarket nació con la visión de modernizar el comercio agropecuario en Guatemala y toda Latinoamérica.</p>
                            <p className="text-gray-600 mb-6">Somos un puente entre productores, distribuidores y compradores que desean una economía rural más justa, digital e inclusiva.</p>
                        </div>
                        <div className="md:w-1/2">
                            <img src={imgHomeOne} alt="Campo agrícola" className="rounded-lg shadow-lg w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-green-700 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold mb-2">+500</div>
                            <div className="text-xl">Productos registrados</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold mb-2">+200</div>
                            <div className="text-xl">Productores activos</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold mb-2">+1000</div>
                            <div className="text-xl">Transacciones exitosas</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Opiniones de nuestros usuarios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                            <div className="flex items-center mb-4 text-yellow-400">
                                {'★★★★★'}
                            </div>
                            <p className="text-gray-600 mb-6">"Gracias a AgroMarket ahora puedo vender mis cosechas directamente y obtener mejores precios. ¡Una gran herramienta para el agricultor!"</p>
                            <div className="flex items-center">
                                <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Cliente" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold text-gray-800">Don Pedro Juárez</h4>
                                    <p className="text-gray-600">Productor de maíz</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                            <div className="flex items-center mb-4 text-yellow-400">
                                {'★★★★★'}
                            </div>
                            <p className="text-gray-600 mb-6">"He encontrado insumos de calidad para mi finca sin tener que salir de casa. Es rápido, seguro y confiable."</p>
                            <div className="flex items-center">
                                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Clienta" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold text-gray-800">María López</h4>
                                    <p className="text-gray-600">Ganadera</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContentHome;
