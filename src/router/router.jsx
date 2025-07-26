import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage/HomePage";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import SearchDonor from "../pages/SearchDonor/SearchDonor";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../components/Blogs/BlogDetails";
import PrivateRoute from "../routes/PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
    // Root Routes
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'searchDonor',
                Component: SearchDonor,
            },
            {
                path: 'blogs',
                Component: Blogs
            },
            {
                path: 'blogs/:id',
                Component: BlogDetails,
            }
        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        
    }
])