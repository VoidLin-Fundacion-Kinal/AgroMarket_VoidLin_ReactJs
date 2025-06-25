import Swal from "sweetalert2";
import { getPostsRequest } from "../services/api.js";
import { useState } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const response = await getPostsRequest();
      

      

      setPosts(response.posts || []);

    } catch (error) {
      console.error("Error fetching posts:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los posts. Inténtalo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, getPosts };
};

export default usePosts;
