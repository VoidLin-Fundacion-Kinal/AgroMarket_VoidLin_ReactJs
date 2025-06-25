"use client"

import { useEffect, useState } from "react"
import { Delete, Edit, UserIcon, PlusIcon, RotateCcw } from "lucide-react"
import { getUsersAll, softDeleteUser, revertSoftDeleteUser } from "../../services/api" 
import Swal from "sweetalert2"
import AddUserModal from '../Modal/AddUserModal'

const UsersTables = () => {
  const [user, serUser] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const columns = ["Nombre", "Apellido", "Sobre-Nombre", "Teléfono", "Dirección", "Email", "Role", "Estado", "Acciones"]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUsersAll()
        serUser(data)
      } catch (error) {
        console.error("Error cargando Usuarios:", error)
      }
    }

    fetchUser()
  }, [])

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      manager: "bg-blue-100 text-blue-800 border-blue-200",
      employee: "bg-green-100 text-green-800 border-green-200",
      user: "bg-gray-100 text-gray-800 border-gray-200",
    }

    const colorClass = roleColors[role?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        {role}
      </span>
    )
  }

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : ""
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  const handleSoftDelete = async (userId) => {
      const confirm = await Swal.fire({
        title: "¿Desactivar Usuario?",
        text: "Este Usuario se marcará como inactivo, no se eliminará permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desactivar",
        cancelButtonText: "Cancelar"
      })
  
      if (confirm.isConfirmed) {
        try {
          await softDeleteUser(userId, "Desactivado por administrador")
          serUser((prev) =>
            prev.map((p) => (p._id === userId ? { ...p, isActive: false } : p))
          )
          Swal.fire("Desactivado", "El Usuario ha sido desactivado.", "success")
        } catch (error) {
          Swal.fire("Error", "No se pudo desactivar el usuario.", "error")
          console.log(error);
  
        }
      }
    }

  const handleRevertSoftDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "¿Reactivar Usuario?",
      text: "Este Usuario se marcará como activo, no se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, reactivar",
      cancelButtonText: "Cancelar"
    })

    if (confirm.isConfirmed) {
      try {
        await revertSoftDeleteUser(userId)
        serUser((prev) =>
          prev.map((p) => (p._id === userId ? { ...p, isActive: true } : p))
        )
        Swal.fire("Reactivado", "El Usuario ha sido reactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo reactivar el usuario.", "error")
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Usuarios</h2>
            <p className="text-sm text-gray-600 mt-1">Lista completa de usuarios del sistema</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear Usuario
          </button>
        </div>
      </div>

      {/* Modal de Crear Usuario */}
      <AddUserModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        setUser={serUser}
      />

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
                {user.map((userData, index) => (
                  <tr
                    key={userData._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-sm">
                            {getInitials(userData.name, userData.surname)}
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{userData.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{userData.surname}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                        @{userData.username}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{userData.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{userData.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                        {userData.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(userData.role)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          userData.isActive
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${userData.isActive ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        {userData.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {userData.isActive ? (
                          <button 
                            onClick={() => handleSoftDelete(userData._id)} 
                            className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group"
                            title="Desactivar usuario"
                          >
                            <Delete className="w-4 h-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleRevertSoftDelete(userData._id)} 
                            className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 hover:shadow-md group"
                            title="Reactivar usuario"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {user.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay usuarios disponibles</h3>
                <p className="text-gray-500">
                  Los usuarios aparecerán aquí una vez que sean registrados en el sistema.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {user.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {user.length} usuario{user.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activos: {user.filter((u) => u.isActive).length}</span>
              <span className="text-gray-400">|</span>
              <span>Admins: {user.filter((u) => u.role?.toLowerCase() === "admin").length}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersTables
