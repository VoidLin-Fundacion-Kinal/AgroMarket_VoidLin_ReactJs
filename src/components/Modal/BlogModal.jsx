"use client"

import { useState, useEffect } from "react"
import { FileIcon, XIcon, Send, MessageCircle, Edit, Trash2, User } from "lucide-react"
import { addComment, updateComment, deleteComment, getPostById } from "../../services/api"
import Swal from "sweetalert2"

const BlogModal = ({ post, onClose, onCommentUpdate }) => {
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState(null)
  const [editText, setEditText] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPost, setCurrentPost] = useState(post)

  useEffect(() => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem("token")
    if (token) {
      // Decodificar el token para obtener información del usuario
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        setCurrentUser({
          token,
          uid: tokenPayload.uid,
          name: tokenPayload.name,
          surname: tokenPayload.surname
        })
      } catch (error) {
        console.error('Error decodificando token:', error)
        setCurrentUser({ token })
      }
    }
  }, [])

  // Actualizar el post cuando cambie
  useEffect(() => {
    setCurrentPost(post)
  }, [post])

  const refreshComments = async () => {
    try {
      // Obtener el post actualizado directamente
      if (currentPost && currentPost._id) {
        const response = await getPostById(currentPost._id)
        if (response.success && response.dataPost) {
          setCurrentPost(response.dataPost)
        }
      }
      
      // También llamar a la función del componente padre si existe
      if (onCommentUpdate) {
        await onCommentUpdate()
      }
    } catch (error) {
      console.error('Error al refrescar comentarios:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    
    if (!currentUser) {
      Swal.fire({
        title: "Sesión requerida",
        text: "Debes iniciar sesión para poder comentar",
        icon: "warning",
        confirmButtonText: "Entendido"
      })
      return
    }

    if (!newComment.trim()) {
      Swal.fire("Error", "El comentario no puede estar vacío", "error")
      return
    }

    try {
      setLoading(true)
      const response = await addComment(currentPost._id, newComment.trim())
      
      if (response.success) {
        setNewComment("")
        Swal.fire("Comentario agregado", "Tu comentario se ha publicado correctamente", "success")
        // Actualizar la lista de comentarios
        await refreshComments()
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al agregar comentario", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) {
      Swal.fire("Error", "El comentario no puede estar vacío", "error")
      return
    }

    try {
      setLoading(true)
      const response = await updateComment(commentId, editText.trim())
      
      if (response.success) {
        setEditingComment(null)
        setEditText("")
        Swal.fire("Comentario actualizado", "Tu comentario se ha actualizado correctamente", "success")
        await refreshComments()
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error al actualizar comentario", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    })

    if (confirm.isConfirmed) {
      try {
        setLoading(true)
        const response = await deleteComment(commentId)
        
        if (response.success) {
          Swal.fire("Comentario eliminado", "Tu comentario se ha eliminado correctamente", "success")
          await refreshComments()
        }
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Error al eliminar comentario", "error")
      } finally {
        setLoading(false)
      }
    }
  }

  const startEditing = (comment) => {
    setEditingComment(comment._id)
    setEditText(comment.comment)
  }

  const cancelEditing = () => {
    setEditingComment(null)
    setEditText("")
  }

  if (!currentPost) return null

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
            <XIcon className="w-5 h-5" />
          </button>

          {/* Contenido con scroll personalizado */}
          <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-green-300 dark:scrollbar-thumb-green-700 scrollbar-track-transparent">
            <div className="p-8 space-y-8 text-green-900 dark:text-green-100">
              {/* Título mejorado */}
              <div className="border-b-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700 pb-6">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 dark:from-green-300 dark:via-emerald-300 dark:to-green-300 bg-clip-text text-transparent leading-tight">
                  {currentPost.title}
                </h2>
                <div className="flex items-center mt-3 space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-full">
                    Publicado el: {new Date(currentPost.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Galería de imágenes mejorada */}
              {currentPost.images?.length > 0 && (
                <section className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Galería</h3>
                    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {currentPost.images.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentPost.images.map((img, idx) => (
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
                    <p className="text-green-800 dark:text-green-200 leading-relaxed">{currentPost.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                      <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                        Dirección:
                      </span>
                      <p className="mt-1 text-green-800 dark:text-green-200">{currentPost.address}</p>
                    </div>
                    <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                      <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                        Usuario:
                      </span>
                      <p className="mt-1 text-green-800 dark:text-green-200">
                        {currentPost.user.name} {currentPost.user.surname}
                      </p>
                    </div>
                  </div>

                  {currentPost.personalData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                          CUI:
                        </span>
                        <p className="mt-1 text-green-800 dark:text-green-200 font-mono">{currentPost.personalData.cui}</p>
                      </div>
                      <div className="bg-white/70 dark:bg-green-800/30 rounded-xl p-4">
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wide">
                          NIT:
                        </span>
                        <p className="mt-1 text-green-800 dark:text-green-200 font-mono">{currentPost.personalData.nit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Formulario de comentarios */}
              <section className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Agregar Comentario</h3>
                </div>

                {currentUser ? (
                  <form onSubmit={handleAddComment} className="space-y-4">
                    <div className="relative">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu comentario aquí..."
                        className="w-full pl-4 pr-12 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 dark:bg-green-800/40 resize-none"
                        rows="3"
                        maxLength="500"
                      />
                      <button
                        type="submit"
                        disabled={loading || !newComment.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 text-right">
                      {newComment.length}/500 caracteres
                    </div>
                  </form>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                        Debes iniciar sesión para poder comentar
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Comentarios mejorados */}
              <section className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Comentarios</h3>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {currentPost.comments?.filter(c => c.isActive !== false).length || 0}
                  </span>
                </div>

                {currentPost.comments?.filter(c => c.isActive !== false).length > 0 ? (
                  <div className="space-y-4">
                    {currentPost.comments
                      .filter(c => c.isActive !== false)
                      .map((comment, idx) => (
                      <div
                        key={idx}
                        className="bg-white/80 dark:bg-green-800/40 rounded-xl p-5 border border-green-200/50 dark:border-green-700/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {editingComment === comment._id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                              rows="3"
                              maxLength="500"
                            />
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-green-600 dark:text-green-400">
                                {editText.length}/500 caracteres
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditComment(comment._id)}
                                  disabled={loading}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-all duration-200"
                                >
                                  {loading ? "Guardando..." : "Guardar"}
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-all duration-200"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <div className="flex-1">
                              <p className="text-green-800 dark:text-green-200 leading-relaxed mb-2">{comment.comment}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                                    {comment.user?.name ? `${comment.user.name} ${comment.user.surname || ""}` : "Anónimo"}
                                  </span>
                                  <span className="text-green-500 dark:text-green-400">•</span>
                                  <span className="text-green-500 dark:text-green-400">
                                    {new Date(comment.date).toLocaleDateString()}
                                  </span>
                                </div>
                                {currentUser && comment.user && (comment.user._id === currentUser.uid || comment.user === currentUser.uid) && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => startEditing(comment)}
                                      className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                                      title="Editar comentario"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteComment(comment._id)}
                                      className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                      title="Eliminar comentario"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
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
