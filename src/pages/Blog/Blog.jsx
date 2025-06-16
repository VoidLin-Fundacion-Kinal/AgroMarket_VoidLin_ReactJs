import { useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts.jsx';
import BlogCard from './../../components/Card/BlogCard.jsx'
import BlogModal from './../../components/Modal/BlogModal.jsx'




const Blog = () => {
  const { posts, isLoading, getPosts } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);


 

  return (
    <section className="bg-gray-100 px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando publicaciones...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No hay publicaciones.</p>
      ) : (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
             <BlogCard
              key={post._id}
              post={post}
              onReadMore={setSelectedPost}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
};

export default Blog;
