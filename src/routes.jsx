import { AuthPages } from './pages/AuthPages/AuthPages.jsx'
import Home from './pages/Home/Home.jsx'
import { Login } from './components/Auth/Login.jsx'
import { Register } from './components/Auth/Register.jsx'



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
        element: <Login />
    },
    {
        path: '/auth/register',
        element: <Register />
    },
    
    {
        path: '/home',
        element: <Home />
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