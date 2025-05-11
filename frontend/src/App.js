// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlogPost from "./pages/CreateBlogPost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost"; 
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protectedRoute";
import Search from "./pages/search";
import UserProfile from "./pages/UserProfile";
import FollowedFeedPage from "./pages/FollowedFeedPage"; 
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
        path: "edit-post/:id",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "search", 
        element: <Search />, 
      },
    
      {
        path: "followed-feed",
        element: <FollowedFeedPage />,
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
  {
    path: "user-profile/:userId", 
    element: <UserProfile />, 
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
