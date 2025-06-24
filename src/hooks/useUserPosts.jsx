import { useEffect, useState } from 'react';
import { fetchUserPosts } from '../services/api';

export default function useUserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUserPosts();
        setPosts(data);
      } catch (err) {
        setError('Error al cargar publicaciones');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { posts, loading, error };
}
