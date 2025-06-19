"use client"

import { useEffect, useState } from "react"
import { Delete, Edit, Eye, FileText, Calendar, User } from 'lucide-react'
import { getPostAll, softDeletePost } from "../../services/api" // ajusta la ruta según tu estructura
import Swal from "sweetalert2"

const BlogTables = () => {
  const [post, setPost] = useState([])
  const columns = ["Autor", "Información", "Título", "Detalles", "Estado", "Acciones"]

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostAll()
        setPost(data)
      } catch (error) {
        console.error("Error cargando Posts:", error)
      }
    }

    fetchPost()
  }, [])

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isActive
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
          }`}
      >
        <span className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-400" : "bg-red-400"}`}></span>
        {isActive ? "Publicado" : "Borrador"}
      </span>
    )
  }

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : ""
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  const truncateTitle = (title, maxLength = 50) => {
    if (!title) return "Sin título"
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  const handleSoftDelete = async (postId) => {
    const confirm = await Swal.fire({
      title: "¿Desactivar Post?",
      text: "Este Post se marcará como inactivo, no se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    })

    if (confirm.isConfirmed) {
      try {
        await softDeletePost(postId, "Desactivado por administrador")
        setPost((prev) =>
          prev.map((p) => (p._id === postId ? { ...p, isActive: false } : p))
        )
        Swal.fire("Desactivado", "El Post ha sido desactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo desactivar el Post.", "error")
        console.log(error);

      }
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Blog</h2>
        <p className="text-sm text-gray-600 mt-1">Control y administración de publicaciones del blog</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {post.map((postItem, index) => (
                  <tr
                    key={postItem._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-violet-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-violet-600 font-bold text-sm">
                            {getInitials(postItem.user?.name, postItem.user?.surname)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {postItem.user?.name} {postItem.user?.surname}
                          </div>
                          <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded mt-1">
                            @{postItem.user?.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                          {postItem.user?.email}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date().toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <FileText className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm leading-tight">
                            {truncateTitle(postItem.title)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">ID: {postItem._id.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          Autor verificado
                        </div>
                        <div className="text-xs text-gray-500">
                          Categoría: <span className="font-medium">General</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(postItem.isActive)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">


                        <button
                        onClick={() => handleSoftDelete(postItem._id)}
                          title="Eliminar post"
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group"
                        >
                          <Delete className="w-4 h-4" />
                        </button>
                        <button
                          title="Más opciones"
                          className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 hover:shadow-md group"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="stroke-current"
                              d="M10.0161 14.9897V15.0397M10.0161 9.97598V10.026M10.0161 4.96231V5.01231"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {post.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay posts disponibles</h3>
                <p className="text-gray-500">
                  Las publicaciones del blog aparecerán aquí una vez que sean creadas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {post.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {post.length} post{post.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Publicados: {post.filter((p) => p.isActive).length}</span>
              <span className="text-gray-400">|</span>
              <span>Borradores: {post.filter((p) => !p.isActive).length}</span>
              <span className="text-gray-400">|</span>
              <span>Autores únicos: {new Set(post.map((p) => p.user?.username)).size}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogTables
