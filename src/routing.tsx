import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import MyBlog from './pages/MyBlog';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
    {
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
            }
        ]
    }
])

export default router;