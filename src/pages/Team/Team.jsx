import { Facebook, Github } from 'lucide-react'
import React from 'react'
import img1 from './../../assets/img-alf-team1.jpg'
import img2 from './../../assets/img-pao-team1.jpg'
import img3 from './../../assets/img-jose-team1.jpg'
import img4 from './../../assets/img-diego-team1.jpg'
import img5 from './../../assets/img-retana-team1.jpg'

const Team = () => {
    return (
        <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
            <div className="container mx-auto max-w-7xl flex-1">
                {/* Título */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600 bg-clip-text">
                        Equipo de Desarrollo
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
                    <p className="text-stone-600 text-lg">
                        Estamos comprometidos a ofrecer soluciones innovadoras y efectivas para nuestros clientes.
                    </p>
                </div>

                {/* Fila Superior */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mb-12">
                    <TeamMember
                        name="Alfredo López"
                        role="Scrum Master"
                        img={img1}
                    />
                    <TeamMember
                        name="Paolo Consuegra"
                        role="Líder Development Team"
                        img={img2}
                    />
                </div>

                {/* Fila Inferior */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    <TeamMember
                        name="José Estrada"
                        role="Developer"
                        img={img3}
                    />
                    <TeamMember
                        name="Antonio Marroquín"
                        role="Developer"
                        img={img4}
                    />
                    <TeamMember
                        name="David Retana"
                        role="Developer"
                        img={img5}
                    />
                </div>
            </div>
        </section>
    )
}

const TeamMember = ({ name, role, img }) => (
    <div className="group w-full max-w-sm text-center">
        <div className="relative overflow-hidden rounded-xl mb-4">
            <img
                src={img}
                alt={name}
                className="w-full aspect-[3/4] object-cover object-center transform group-hover:scale-105 transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <div className="flex space-x-4">
                    <a href="#" className="bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                        <Facebook />
                    </a>
                    <a href="#" className="bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-200">
                        <Github />
                    </a>
                </div>
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-indigo-600 font-medium">{role}</p>
    </div>
)

export default Team
