import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';

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
                path: "blogg",
                element: <BlogList />
            },
            {
                path: "loggain",
                element: <LoginPage />
            }
        ]
    }
])

export default router;