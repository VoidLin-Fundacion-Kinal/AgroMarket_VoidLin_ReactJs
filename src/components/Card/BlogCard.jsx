"use client"

import { ArrowRightIcon, CalendarIcon, EyeIcon } from "lucide-react"



const BlogCard = ({ post, onClick }) => {
  const baseURL = "http://localhost:2003/images/postImages/"

  return (
    <div
      className="group relative bg-gradient-to-br from-white via-green-50/30 to-white dark:from-green-950 dark:via-green-900/50 dark:to-green-950 border-2 border-green-200/50 dark:border-green-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-200/20 dark:hover:shadow-green-800/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick()
      }}
      aria-label={`Abrir detalles del post: ${post.title}`}
    >
      {/* Barra superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      {/* Imagen mejorada */}
      {post.images && post.images.length > 0 && (
        <div className="relative overflow-hidden">
          <img
            src={`${baseURL}${post.images[0]}`}
            alt={post.title}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Badge de imagen múltiple */}
          {post.images.length > 1 && (
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-green-800/90 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm border border-green-200 dark:border-green-700">
              +{post.images.length - 1}
            </div>
          )}

          {/* Indicador de hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <EyeIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Contenido del card */}
      <div className="p-6 space-y-4">
        {/* Título mejorado */}
        <div className="relative">
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 dark:from-green-200 dark:via-emerald-200 dark:to-green-200 bg-clip-text text-transparent group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-green-600 dark:group-hover:from-green-100 dark:group-hover:via-emerald-100 dark:group-hover:to-green-100 transition-all duration-300 line-clamp-2 leading-tight">
            {post.title}
          </h3>
          {/* Línea decorativa bajo el título */}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
        </div>

        {/* Descripción mejorada */}
        <div className="relative">
          <p className="text-sm text-gray-600 dark:text-green-300 line-clamp-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-green-200 transition-colors duration-300">
            {post.description}
          </p>
          {/* Fade effect para texto largo */}
          <div className="absolute bottom-0 right-0 w-8 h-6 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-green-950 dark:via-green-950/80 group-hover:from-green-50 dark:group-hover:from-green-900 transition-colors duration-300"></div>
        </div>

        {/* Footer del card */}
        <div className="flex items-center justify-between pt-2 border-t border-green-100 dark:border-green-800/50">
          {/* Fecha con diseño mejorado */}
          <div className="flex items-center space-x-2 text-xs text-green-500 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 dark:group-hover:from-green-700 dark:group-hover:to-emerald-700 transition-colors duration-300">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <span className="font-medium">{new Date(post.date).toLocaleDateString()}</span>
          </div>

          {/* Indicador de acción */}
          <div className="flex items-center space-x-1 text-green-500 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-xs font-medium">Ver más</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
    </div>
  )
}

export default BlogCard
