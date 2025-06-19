import React, { useState } from 'react';
import useCreatePost from '../../hooks/useCreatePost';

const NewPostView = ({ onCancel }) => {
  const [formData, setFormData] = useState({ title: '', description: '', address: '', images: [] });
  const { handleCreatePost, loading, error, success } = useCreatePost();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('address', formData.address);
    for (let img of formData.images) {
      data.append('images', img);
    }
    await handleCreatePost(data);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear nueva publicación</h2>
      {success ? (
        <p className="text-green-600">¡Publicación creada!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Título" onChange={handleChange} className="block mb-3 w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Descripción" onChange={handleChange} className="block mb-3 w-full p-2 border rounded" required />
          <input type="text" name="address" placeholder="Dirección" onChange={handleChange} className="block mb-3 w-full p-2 border rounded" required />
          <input type="file" multiple onChange={handleFileChange} className="block mb-3" />
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPostView;
