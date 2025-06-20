import useUserPosts from "../../hooks/useUserPosts"

const MainContent = () => {
  const { posts, loading, error } = useUserPosts()
  const baseURL = "http://localhost:2003/images/postImages/"

  // Obtener el usuario desde localStorage
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const user = storedUser ? JSON.parse(storedUser) : null

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
            <div className="w-1 h-8 bg-gradient-to-b from-[#048437] to-[#06a43d] rounded-full"></div>
            <h2 className="text-3xl font-bold text-[#048437]">Mis Publicaciones</h2>
            <div className="w-1 h-8 bg-gradient-to-b from-[#048437] to-[#06a43d] rounded-full"></div>
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
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No tienes publicaciones aún</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 100).map((post, idx) => (
              <PostCard key={idx} post={post} baseURL={baseURL} />
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

const PostCard = ({ post, baseURL }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#06a43d] group">
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
          <svg className="w-4 h-4 mr-2 text-[#d76628]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{post.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2 text-[#d76628]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-[#048437] to-[#06a43d] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
          Ver detalles
        </button>
      </div>
    </div>
  </div>
)

export default MainContent
