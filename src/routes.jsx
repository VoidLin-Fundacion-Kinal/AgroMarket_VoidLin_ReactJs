import { AuthPages } from './pages/AuthPages/AuthPages.jsx'



export const routes = [
    {
        path: '/', 
        element: <AuthPages />,
    },
    {
        path: '/auth', 
        element: <AuthPages />
    }
    
    /* {
        path: '/dashboardAdmin',
        element: (
            <DashboardAdmin />
        )
    },
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