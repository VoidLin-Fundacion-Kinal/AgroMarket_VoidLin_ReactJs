import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import CatalogProducts from './pages/Catalog/CatalogProducts.jsx';
import { AuthPages, AuthPagesRegister } from './pages/AuthPages/AuthPages.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
  return (
    <Routes>
      {/* Rutas que usan Navbar y Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="catalog/products" element={<CatalogProducts />} />
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
