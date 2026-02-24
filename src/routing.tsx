import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import MyBlog from './pages/MyBlog';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import BlogPostPage from './pages/BlogPostPage';

// Routing struktur för applikationen, definierar vilka komponenter som ska renderas för olika URL:er
const router = createBrowserRouter([
    {
        // Rotvägen som renderar Layout-komponenten, som innehåller gemensamma element som header och footer
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/blogg",
                element: <BlogList />
            },
            {
                // Dynamisk route för att visa enskilda blogginlägg baserat på ID
                path: "/blogg/:id",
                element: <BlogPostPage />
            },
            {
                // Skyddad route som kräver inloggning för att visa användarens egna blogginlägg
                path: "/minblogg",
                element: (
                    <ProtectedRoute> 
                        <MyBlog />
                    </ProtectedRoute>
                )  
            },
            {
                path: "/loggain",
                element: <LoginPage />
            },
            { 
                path: "/registrera",
                element: <RegisterPage /> 
            }
        ]
    }
])

export default router;