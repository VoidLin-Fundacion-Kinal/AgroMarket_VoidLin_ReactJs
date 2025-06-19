"use client"

const PostModal = ({ post, onClose }) => {
  if (!post) return null

  const baseURL = "http://localhost:2003/images/postImages/"

  return (
    <>
      {/* Overlay oscuro mejorado */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md z-40 transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal mejorado */}
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6">
        <div className="relative bg-gradient-to-br from-white via-green-50/50 to-white dark:from-green-950 dark:via-green-900/50 dark:to-green-950 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-green-200/50 dark:border-green-700/50 backdrop-blur-sm transform transition-all duration-300 hover:shadow-green-200/20 dark:hover:shadow-green-800/20">
          {/* Header con gradiente */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>

          {/* Botón cerrar mejorado */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-green-800/90 text-green-600 dark:text-green-300 hover:text-red-500 dark:hover:text-red-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-green-200 dark:border-green-700"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Contenido con scroll personalizado */}
          <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-green-300 dark:scrollbar-thumb-green-700 scrollbar-track-transparent">
            <div className="p-8 space-y-8 text-green-900 dark:text-green-100">
              {/* Título mejorado */}
              <div className="border-b-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700 pb-6">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 dark:from-green-300 dark:via-emerald-300 dark:to-green-300 bg-clip-text text-transparent leading-tight">
                  {post.title}
                </h2>
                <div className="flex items-center mt-3 space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-full">
                    Publicado el: {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Galería de imágenes mejorada */}
              {post.images?.length > 0 && (
                <section className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Galería</h3>
                    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {post.images.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <img
                          src={`${baseURL}${img}`}
                          alt={`Imagen ${idx + 1}`}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-green-800/90 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Imagen {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Descripción y datos mejorados */}
              <section className="bg-gradient-to-br from-white/80 to-green-50/80 dark:from-green-900/40 dark:to-green-800/40 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 shadow-inner">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Información</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-green-800 dark:text-green-200 leading-relaxed">{post.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                      <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                        Dirección:
                      </span>
                      <p className="mt-1 text-green-800 dark:text-green-200">{post.address}</p>
                    </div>
                    <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                      <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                        Usuario:
                      </span>
                      <p className="mt-1 text-green-800 dark:text-green-200">
                        {post.user.name} {post.user.surname}
                      </p>
                    </div>
                  </div>

                  {post.personalData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                          CUI:
                        </span>
                        <p className="mt-1 text-green-800 dark:text-green-200 font-mono">{post.personalData.cui}</p>
                      </div>
                      <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                          NIT:
                        </span>
                        <p className="mt-1 text-green-800 dark:text-green-200 font-mono">{post.personalData.nit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Comentarios mejorados */}
              <section className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Comentarios</h3>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {post.comments?.length || 0}
                  </span>
                </div>

                {post.comments?.length > 0 ? (
                  <div className="space-y-4">
                    {post.comments.map((comment, idx) => (
                      <div
                        key={idx}
                        className="bg-white/80 dark:bg-green-800/40 rounded-xl p-5 border border-green-200/50 dark:border-green-700/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "A"}
                          </div>
                          <div className="flex-1">
                            <p className="text-green-800 dark:text-green-200 leading-relaxed mb-2">{comment.comment}</p>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                                {comment.user?.name ? `${comment.user.name} ${comment.user.surname || ""}` : "Anónimo"}
                              </span>
                              <span className="text-green-500 dark:text-green-400">•</span>
                              <span className="text-green-500 dark:text-green-400">
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <p className="text-green-500 dark:text-green-400 font-medium">No hay comentarios aún</p>
                    <p className="text-green-400 dark:text-green-500 text-sm mt-1">Sé el primero en comentar</p>
                  </div>
                )}
              </section>

              {/* Footer mejorado */}
              <div className="flex justify-end pt-6 border-t border-green-200/50 dark:border-green-700/50">
                <button
                  onClick={onClose}
                  className="group relative px-8 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
                >
                  <span className="relative z-10">Cerrar</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-700 to-green-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

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
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-medium">{new Date(post.date).toLocaleDateString()}</span>
          </div>

          {/* Indicador de acción */}
          <div className="flex items-center space-x-1 text-green-500 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-xs font-medium">Ver más</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
    </div>
  )
}

export default BlogCard
