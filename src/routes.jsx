import { AuthPages, AuthPagesRegister } from './pages/AuthPages/AuthPages.jsx'
import Home from './pages/Home/Home.jsx'
import { Login } from './components/Auth/Login.jsx'
import { Register } from './components/Auth/Register.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import CatalogProducts from './pages/Catalog/CatalogProducts.jsx'



export const routes = [
    {
        path: '/', 
        element: <Home />,
    },
    {
        path: '/auth', 
        element: <AuthPages />
    },

    {
        path: '/auth/login',
        element: <AuthPages />
    },
    {
        path: '/auth/register',
        element: <AuthPagesRegister />
    },
    
    {
        path: '/home',
        element: <Home />
    },

    {
        path: '/catalog/products',
        element: <CatalogProducts />
    },

    {
        path: '*',
        element: <NotFound />
    }
    /*
    {
        path: '/dashboardHotelAdmin',
        element: (
        <ProtectedRoute>
            <DashboardAdminHotel />
        </ProtectedRoute>
        )
    },
    {
        path: '/dashboardClient',
        element: (
        <ProtectedRoute>
            <DashboardClient />
        </ProtectedRoute>
        )
    },
    {
        path: '*',
        element: <NotFoundPages />
    }, */
    

]