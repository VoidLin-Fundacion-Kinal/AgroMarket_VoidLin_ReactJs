import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import CatalogProducts from './pages/Catalog/CatalogProducts.jsx';
import { AuthPages, AuthPagesRegister } from './pages/AuthPages/AuthPages.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Team from './pages/Team/Team.jsx';
import Contact from './pages/Contact/Contact.jsx';
import ContentHome from './pages/Home/ContentHome.jsx';
import BlogSection from './pages/Blog/Blog.jsx';

function App() {
  return (
    <Routes>
      {/* Rutas que usan Navbar y Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ContentHome />} />
        <Route path="home" element={<ContentHome />} />
        <Route path="catalog" element={<CatalogProducts />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogSection />} />
      </Route>

      {/* Rutas sin layout (como login/register) */}
      <Route path="/auth" element={<AuthPages />} />
      <Route path="/auth/login" element={<AuthPages />} />
      <Route path="/auth/register" element={<AuthPagesRegister />} />

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
