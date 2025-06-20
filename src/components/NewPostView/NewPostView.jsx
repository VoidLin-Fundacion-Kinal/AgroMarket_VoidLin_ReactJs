import React, { useState } from 'react';
import useCreatePost from '../../hooks/useCreatePost';
import Swal from 'sweetalert2';

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

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear nueva publicación</h2>
      {success ? (
        <p className="text-green-600">¡Publicación creada!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            onChange={handleChange}
            className="block mb-3 w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            className="block mb-3 w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
            className="block mb-3 w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="block mb-3"
          />
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPostView;
