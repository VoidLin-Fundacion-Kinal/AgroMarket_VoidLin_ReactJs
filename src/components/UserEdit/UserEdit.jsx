"use client"
import { User, Lock, Camera, Save, Upload } from "lucide-react"
import useUserEdit from "../../hooks/useUserEdit"

const Editar = () => {
  const {
    formData,
    passwordData,
    loading,
    error,
    handleChange,
    handlePasswordChange,
    handleSubmit,
    handlePasswordSubmit,
    handleImageChange,
    handleImageSubmit,
  } = useUserEdit()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#244933] mb-2">Editar Perfil</h1>
          <p className="text-gray-600">Actualiza tu información personal</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-[#ed4e0a] rounded-r-lg">
            <p className="text-[#ed4e0a] font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#244933] to-[#1c8b58] p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Información Personal</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#244933]">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#048437] focus:ring-0 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#244933]">Apellido</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#048437] focus:ring-0 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#244933]">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#048437] focus:ring-0 transition-colors duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#244933]">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#048437] focus:ring-0 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#244933]">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#048437] focus:ring-0 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: loading ? "#6b7280" : "linear-gradient(to right, #048437, #1c8b58)",
                }}
                className="w-full text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Guardando..." : "Guardar Cambios"}</span>
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Password Change Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#ed4e0a] to-orange-500 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Cambiar Contraseña</h3>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#244933]">Contraseña Actual</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ed4e0a] focus:ring-0 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#244933]">Nueva Contraseña</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ed4e0a] focus:ring-0 transition-colors duration-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: loading ? "#6b7280" : "linear-gradient(to right, #ed4e0a, #f97316)",
                  }}
                  className="w-full text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <Lock className="w-5 h-5" />
                  <span>{loading ? "Actualizando..." : "Cambiar Contraseña"}</span>
                </button>
              </form>
            </div>

            {/* Profile Image Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1c8b58] to-[#048437] p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Imagen de Perfil</h3>
                </div>
              </div>

              <form onSubmit={handleImageSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#244933]">Seleccionar Imagen</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-[#1c8b58] focus:ring-0 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1c8b58] file:text-white hover:file:bg-[#048437]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Formatos soportados: JPG, PNG, GIF (máx. 5MB)</p>
                </div>

                <button
                  type="submit"
                  style={{
                    background: loading ? "#6b7280" : "linear-gradient(to right, #1c8b58, #048437)",
                  }}
                  className="w-full text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <Upload className="w-5 h-5" />
                  <span>{loading ? "Subiendo..." : "Subir Imagen"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Editar
