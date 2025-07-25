import { CalendarIcon, FileIcon, MapPinIcon, Trash2, Edit } from "lucide-react"
import useUserPosts from "../../hooks/useUserPosts"
import { softDeletePost } from "../../services/api"
import Swal from "sweetalert2"

const MainContent = () => {
  const { posts, loading, error, refetch } = useUserPosts()
  const baseURL = "http://localhost:2003/images/postImages/"

  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const user = storedUser ? JSON.parse(storedUser) : null

  const handleDeletePost = async (postId, postTitle) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar publicación?",
      text: `¿Estás seguro de que quieres eliminar "${postTitle}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    })

    if (confirm.isConfirmed) {
      try {
        await softDeletePost(postId)
        
        Swal.fire({
          title: "¡Eliminado!",
          text: "La publicación ha sido eliminada exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar"
        })

        // Refetch posts to update the list
        refetch()
      } catch (error) {
        console.error("Error al eliminar la publicación:", error)
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la publicación. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar"
        })
      }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Card Section */}
      <div className="mb-8">
        <Card
          title="Bienvenido"
          value={user ? `${user.name}` : "Usuario"}
          bgColor="bg-gradient-to-r from-[#048437] to-[#06a43d]"
          textColor="text-white"
        />
      </div>

      {/* Posts Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-[#048437]">📄 Mis Publicaciones </h2>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#048437]"></div>
                <p className="text-[#048437] font-medium">Cargando publicaciones...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No tienes publicaciones aún</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 100).map((post, idx) => (
              <PostCard 
                key={idx} 
                post={post} 
                baseURL={baseURL} 
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({ title, value, bgColor, textColor = "text-white" }) => (
  <div className={`${bgColor} ${textColor} rounded-2xl shadow-lg p-8 relative overflow-hidden`}>
    <div className="relative z-10">
      <p className="text-lg font-medium opacity-90 mb-2">{title}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>

    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10 translate-x-10"></div>
  </div>
)

const PostCard = ({ post, baseURL, onDelete }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#06a43d] group relative">
    {/* Action Buttons - Always visible */}
    <div className="absolute top-3 right-3 z-10 flex space-x-2">
      <button
        onClick={() => onDelete(post._id, post.title)}
        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-110 transform"
        title="Eliminar publicación"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      
    </div>

    {/* Image Section */}
    {post.images && post.images.length > 0 && (
      <div className="relative overflow-hidden">
        <img
          src={`${baseURL}${post.images[0]}`}
          alt="Imagen del post"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    )}

    {/* Content Section */}
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-[#048437] group-hover:text-[#06a43d] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        <div className="w-2 h-2 bg-[#d76628] rounded-full flex-shrink-0 mt-2"></div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.description}</p>

      {/* Location and Date */}
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="w-4 h-4 mr-2 text-[#d76628]" />
          <span className="truncate">{post.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-2 text-[#d76628]" />
          <span>
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          post.isActive 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            post.isActive ? "bg-green-400" : "bg-red-400"
          }`}></span>
          {post.isActive ? "Activo" : "Eliminado"}
        </span>
      </div>
    </div>
  </div>
)

export default MainContent
