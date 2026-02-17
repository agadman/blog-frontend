import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "blogg",
        element: <BlogList />
    }

])

export default router;