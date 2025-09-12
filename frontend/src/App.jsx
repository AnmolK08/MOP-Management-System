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
      { path: "login", element: <LoginPage /> },  
      { path: "signup", element: <SignupPage /> },  
     
    ],
  },  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
