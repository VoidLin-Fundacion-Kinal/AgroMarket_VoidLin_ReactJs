import React from 'react'
import img1 from './../../assets/bg-notfound-1.png'

const NotFound = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
                <img
                    src={img1}
                    alt="Lost man in desert"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-10" />
            </div>

            <main className="flex flex-1 items-center justify-center px-6 py-12 sm:py-24 lg:px-8">
                <div className="text-center max-w-md">
                    <p className="text-base font-semibold text-green-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg text-gray-500">
                        Lo sentimos, no pudimos encontrar la página que estás buscando.          </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-800"
                        >
                            Go Home
                        </a>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFound
