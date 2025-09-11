import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./Layout/AppLayout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import LandingPage from "./Pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,path:"/", element: <LandingPage /> },     
      { path: "loginpage", element: <LoginPage /> },  
      { path: "signupage", element: <SignupPage /> },  
     
    ],
  },  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
