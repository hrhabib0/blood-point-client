import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage/HomePage";

export const router = createBrowserRouter([
    // Root Routes
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
        ]

    }
])