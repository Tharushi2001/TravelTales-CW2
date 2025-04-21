import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlogPost from "./pages/CreateBlogPost";
import Layout from "./components/Layout";
import './styles.scss';

const router = createBrowserRouter([
  // Layout routes (Navbar + Footer included)
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Default route for '/'
        element: <Home />,
      },
    ],
  },

  // Authentication Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Create Blog Post Route
  {
    path: "/create-blog-post", 
    element: <CreateBlogPost />,
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
