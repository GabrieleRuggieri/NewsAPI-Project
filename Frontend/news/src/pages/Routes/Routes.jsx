import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Home/Home";
import { NotFound } from "../NotFound/NotFound";
import { Layout } from "../../components/layouts/MainLayout/Layout";
import { AuthContextProvider } from "../../contexts/AuthContext/AuthContextProvider";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Login } from "../Login/Login";
import { Registrazione } from "../Registrazione/Registrazione";
import { News } from "../News/News";
import { NewsSaved } from "../NewsSaved/NewsSaved";
import { Profile } from "../Profile/Profile";

const router = createBrowserRouter([
    {
        element: <AuthContextProvider><Layout /></AuthContextProvider>,
        children: [
            {
                path: "/",
                children: [
                    {
                        path: "",
                        element: <Login />,
                    },
                    {
                        path: "registrazione",
                        element: <Registrazione />,
                    },
                    {
                        path: "home",
                        element: <ProtectedRoute><Home /></ProtectedRoute>,
                    },
                    {
                        path: "news",
                        element: <ProtectedRoute><News /></ProtectedRoute>,
                    },
                    {
                        path: "saved",
                        element: <ProtectedRoute><NewsSaved /></ProtectedRoute>
                    },
                    {
                        path: "profile",
                        element: <ProtectedRoute><Profile /></ProtectedRoute>
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    }
])

export function Routes() {
    return (
        <RouterProvider router={router} />
    );
}