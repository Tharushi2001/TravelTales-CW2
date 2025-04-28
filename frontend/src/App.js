import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlogPost from "./pages/CreateBlogPost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost"; // ✅ Import EditPost
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protectedRoute"; // ✅ Import ProtectedRoute
import Search from "./pages/search"; // ✅ Import Search
import './styles.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "view-post/:id",
        element: <ViewPost />,
      },
      {
        path: "create-blog-post",
        element: (
          <ProtectedRoute>
            <CreateBlogPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-post/:id", // ✅ Proper EditPost route inside Layout
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "search", // ✅ Add Search route
        element: <Search />, 
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
