import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import InvoicesTables from './components/Tables/InvoicesTables.jsx';
import CartsTables from './components/Tables/CartsTables.jsx';
import BlogTables from './components/Tables/BlogTables.jsx';
import ContentHomeDashAdmin from './pages/Home/ContentHomeDashAdmin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CartView from './components/Cart/CartView.jsx';
import BillsView from './components/BillsUserView/BillsView.jsx';
import NewPostView from './components/NewPostView/NewPostView.jsx';
import Editar from './components/UserEdit/UserEdit.jsx';
import MainContent from './components/MainContent/MainContent.jsx';
import InventoryTables from './components/Tables/InventoryTables.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import AccessDenied from './components/AccessDenied/AccessDenied.jsx';





function App() {

const navigate = useNavigate();

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
          <Route path='/account/settings' element={<Dashboard />}>
            <Route index element={<MainContent />} />
            <Route path='cartUser' element={<CartView />} />
            <Route path='bills' element={<BillsView />} />
            <Route path='newpost' element={<NewPostView onCancel={() => navigate('/account/settings')} />} />
            <Route path='edit' element={<Editar />} />
          </Route>
        </Route>

        {/* Rutas de autenticación */}
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/auth/login" element={<AuthPages />} />
        <Route path="/auth/register" element={<AuthPagesRegister />} />

        {/* Dashboard admin - Rutas protegidas */}
        <Route path="/dashboardAdmin" element={
          <ProtectedRoute requiredRole="ADMINPLATAFORM">
            <Layout2 />
          </ProtectedRoute>
        }>
          <Route index element={<ContentHomeDashAdmin />} />
          <Route path='products' element={<ProductTables/>}/>
          <Route path='providers' element={<ProviderTables/>}/>
          <Route path='categories' element={<CategoriesTables/>}/>
          <Route path='user' element={<UsersTables/>}/>
          <Route path='invoices' element={<InvoicesTables />}/>
          <Route path='carts' element={<CartsTables />}/>
          <Route path='blog' element={<BlogTables />}/>
          <Route path='inventory' element={<InventoryTables />}/>
        </Route>

        <Route path='/account/settings' element={<Dashboard />}/>

        {/* Ruta de acceso denegado */}
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
