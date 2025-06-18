"use client"

const BlogModal = ({ post, onClose }) => {
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

export default BlogModal
