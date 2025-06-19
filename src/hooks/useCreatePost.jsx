import { useState } from 'react';
import { createPost } from '../services/api';

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreatePost = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await createPost(formData);
      setSuccess(true);
    } catch (err) {
      setError('Error al crear publicación');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePost, loading, error, success };
};

export default useCreatePost;
