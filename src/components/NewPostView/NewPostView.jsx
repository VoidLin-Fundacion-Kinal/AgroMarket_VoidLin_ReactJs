import React, { useState } from 'react';
import useCreatePost from '../../hooks/useCreatePost';
import Swal from 'sweetalert2';
import { PlusCircle, Image, MapPin, FileText, X } from 'lucide-react';

const NewPostView = ({ onCancel }) => {
  const [formData, setFormData] = useState({ title: '', description: '', address: '', images: [] });
  const { handleCreatePost, loading, error, success } = useCreatePost();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const validateFormData = () => {
    const errors = [];

    if (!formData.title.trim()) errors.push('El título es obligatorio.');
    if (!formData.description.trim()) errors.push('La descripción es obligatoria.');
    if (!formData.address.trim()) errors.push('La dirección es obligatoria.');
    if (!formData.images || formData.images.length === 0) errors.push('Debe subir al menos una imagen.');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData();

    if (validationErrors.length > 0) {
      Swal.fire({
        title: 'Errores de validación',
        html: validationErrors.map(err => `<b>•</b> ${err}`).join('<br><br>'),
        icon: 'error'
      });
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('address', formData.address);
    for (let img of formData.images) {
      data.append('images', img);
    }

    try {
      await handleCreatePost(data);
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (backendErrors && backendErrors.length > 0) {
        const errorMessages = backendErrors.map(err =>
          `<b>Mensaje:</b> ${err.message}`
        ).join('<br><br>');

        Swal.fire({
          title: 'Errores del servidor',
          html: errorMessages,
          icon: 'error'
        });
      } else {
        Swal.fire("Error", error.response?.data?.message || "Error desconocido", "error");
      }
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Publicación Creada!</h2>
            <p className="text-green-100">Tu publicación ha sido creada exitosamente</p>
          </div>
          <div className="p-6 text-center">
            <button
              onClick={onCancel}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#244933] to-[#2d5a3f] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Crear Nueva Publicación</h2>
                <p className="text-green-100 text-sm">Comparte tu experiencia con la comunidad</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#244933]" />
                Título de la Publicación
              </label>
              <input
                type="text"
                name="title"
                placeholder="Escribe un título atractivo para tu publicación..."
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#244933] focus:border-[#244933] transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#244933]" />
                Descripción
              </label>
              <textarea
                name="description"
                placeholder="Describe tu experiencia, consejos o información que quieras compartir..."
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#244933] focus:border-[#244933] transition-colors duration-200 placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#244933]" />
                Dirección
              </label>
              <input
                type="text"
                name="address"
                placeholder="Ingresa la dirección o ubicación..."
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#244933] focus:border-[#244933] transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Images Upload */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Image className="w-4 h-4 mr-2 text-[#244933]" />
                Imágenes
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#244933] transition-colors duration-200">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Arrastra y suelta las imágenes aquí, o
                </p>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#244933] text-white rounded-lg hover:bg-[#1a3a28] transition-colors duration-200 cursor-pointer font-medium"
                >
                  Seleccionar Imágenes
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, JPEG hasta 10MB cada una
                </p>
              </div>
              {formData.images && formData.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    {formData.images.length} imagen{formData.images.length !== 1 ? 'es' : ''} seleccionada{formData.images.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 text-xs font-bold">!</span>
                  </div>
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#244933] text-white rounded-lg hover:bg-[#1a3a28] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publicando...
                  </>
                ) : (
                  <>
                    <div className='flex items-center bg-amber-950 text-white rounded-lg px-4 py-2'>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Publicar
                    </div>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostView;
