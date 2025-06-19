import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import CatalogProducts from './pages/Catalog/CatalogProducts.jsx';
import { AuthPages, AuthPagesRegister } from './pages/AuthPages/AuthPages.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Team from './pages/Team/Team.jsx';
import Contact from './pages/Contact/Contact.jsx';
import ContentHome from './pages/Home/ContentHome.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Layout2 from './layouts/Layout2.jsx';
import ProductTables from './components/Tables/ProductTables.jsx';
import ProviderTables from './components/Tables/ProvidersTables.jsx';
import CategoriesTables from './components/Tables/CategoriesTables.jsx';
import UsersTables from './components/Tables/UsersTables.jsx';
import InventoryTables from './components/Tables/InventoryTables.jsx';
import InvoicesTables from './components/Tables/InvoicesTables.jsx';
import CartsTables from './components/Tables/CartsTables.jsx';
import BlogTables from './components/Tables/BlogTables.jsx';
import ContentHomeDashAdmin from './pages/Home/ContentHomeDashAdmin.jsx';





function App() {
  return (
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ContentHome />} />
          <Route path="home" element={<ContentHome />} />
          <Route path="catalog" element={<CatalogProducts />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Rutas de autenticación */}
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/auth/login" element={<AuthPages />} />
        <Route path="/auth/register" element={<AuthPagesRegister />} />

        {/* Dashboard admin */}
        <Route path="/dashboardAdmin" element={<Layout2 />}>
          <Route index element={<ContentHomeDashAdmin />} />

          <Route path='home' element={<ContentHomeDashAdmin/>}/>
          <Route path='products' element={<ProductTables/>}/>
          <Route path='providers' element={<ProviderTables/>}/>
          <Route path='categories' element={<CategoriesTables/>}/>
          <Route path='user' element={<UsersTables/>}/>
          <Route path='inventory' element={<InventoryTables/>}/>
          <Route path='invoices' element={<InvoicesTables />}/>
          <Route path='carts' element={<CartsTables />}/>
          <Route path='blog' element={<BlogTables />}/>







        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
