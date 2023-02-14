import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Index";
import Layout from "./Layout/Layout";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import BookCreate from "./Pages/Admin/Book/Create";
import BookIndex from "./Pages/Admin/Book/Index";
import Books from "./Pages/Books";
import BookEdit from "./Pages/Admin/Book/Edit";
import GenreIndex from "./Pages/Admin/Genre/Index";
import GenreCreate from "./Pages/Admin/Genre/Create";
import GenreEdit from "./Pages/Admin/Genre/Edit";
import AuthorCreate from "./Pages/Admin/Author/Create";
import AuthorEdit from "./Pages/Admin/Author/Edit";
import AuthorIndex from "./Pages/Admin/Author/Index";
import UpdateSystemConfig from "./Pages/Admin/UpdateSystemConfig";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'index',
                element: <Home />
            },
            {
                path: 'about-us',
                element: <AboutUs />
            },
            {
                path: 'books',
                element: <Books />
            },
            {
                path: 'admin',
                element: <Dashboard />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    
                ]
            },
            {
                path: '/admin/books',
                element: <BookIndex />
            },
            {
                path: '/admin/books/create',
                element: <BookCreate />
            },
            {
                path: '/admin/books/:id/edit',
                element: <BookEdit />
            },
            {
                path: '/admin/genres',
                element: <GenreIndex />
            },
            {
                path: '/admin/genres/create',
                element: <GenreCreate />
            },
            {
                path: '/admin/genres/:id/edit',
                element: <GenreEdit />
            },
            {
                path: '/admin/authors',
                element: <AuthorIndex />
            },,
            {
                path: '/admin/authors/create',
                element: <AuthorCreate />
            },
            {
                path: '/admin/authors/:id/edit',
                element: <AuthorEdit />
            },
            {
                path: '/admin/system_config_update',
                element: <UpdateSystemConfig />
            }
        ]
    }
])

export default router;