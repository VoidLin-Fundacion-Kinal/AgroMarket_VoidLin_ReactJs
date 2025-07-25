import React, { useState, useEffect } from 'react';
import { usePosts } from './../../hooks/usePosts';
import BlogModal from './../../components/Modal/BlogModal';
import BlogCard from './../../components/Card/BlogCard';

const Blog = () => {
  const { posts, isLoading, getPosts } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getPosts().then(() => {
      console.log('Posts después de cargar:', posts);
    });
  }, []);

  // Actualizar el post seleccionado cuando los posts cambien
  useEffect(() => {
    if (selectedPost && posts.length > 0) {
      const updatedPost = posts.find(p => p._id === selectedPost._id);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      }
    }
  }, [posts, selectedPost]);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleCommentUpdate = async () => {
    try {
      // Recargar todos los posts para obtener los comentarios actualizados
      await getPosts();
    } catch (error) {
      console.error('Error al actualizar comentarios:', error);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-green-950 text-green-900 dark:text-green-100 px-4 md:px-10 py-8">
      {/* Encabezado del Blog */}
      <section className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          Bienvenido a nuestro <span className="text-green-600 dark:text-green-400">Blog Agro</span>
        </h1>
        <p className="text-md md:text-lg text-green-700 dark:text-green-300 max-w-xl mx-auto">
          Explora publicaciones recientes sobre productos agrícolas, ventas y experiencias de nuestra comunidad.
        </p>
      </section>

      {/* Contenido de los Posts */}
      <section className="max-w-7xl mx-auto">
        {isLoading ? (
          <p className="text-center text-green-600 dark:text-green-300">Cargando posts...</p>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} onClick={() => openModal(post)} />
            ))}
          </div>
        ) : (
          <p className="text-center text-green-700 dark:text-green-300">No hay posts para mostrar</p>
        )}
      </section>

      {/* Modal de Detalles */}
      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={closeModal} 
          onCommentUpdate={handleCommentUpdate}
        />
      )}
    </main>
  );
};

export default Blog;
