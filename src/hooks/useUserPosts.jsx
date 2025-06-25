import { useEffect, useState, useCallback } from 'react';
import { fetchUserPosts } from '../services/api';

export default function useUserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUserPosts();
      setPosts(data);
    } catch (err) {
      setError('Error al cargar publicaciones');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const refetch = useCallback(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, loading, error, refetch };
}
