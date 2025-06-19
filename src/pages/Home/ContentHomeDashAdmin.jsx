"use client"

import { useState, useEffect } from "react"
import { Star, Sparkles } from "lucide-react"

const ContentHomeDashAdmin = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Elementos decorativos */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-emerald-200 rounded-full opacity-40 animate-pulse delay-300"></div>
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-green-300 rounded-full opacity-50 animate-pulse delay-700"></div>

          {/* Icono principal */}
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Star className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Mensaje de bienvenida */}
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          ¡Bienvenido!
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-6">{getGreeting()}, es un placer tenerte aquí</p>

        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Sparkles className="w-5 h-5" />
          <span className="text-lg">
            {currentTime.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Mensaje adicional */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 shadow-sm">
          <p className="text-gray-700 text-lg">
            Estás en el panel de administración de <span className="font-semibold text-green-600">AgroMarket</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContentHomeDashAdmin
