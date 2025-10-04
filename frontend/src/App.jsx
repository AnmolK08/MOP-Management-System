import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./Layout/AppLayout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import LandingPage from "./Pages/LandingPage";
import DashboardLayout from "./Layout/DashboardLayout";
import DashboardPage from "./Pages/DashboardPage";
import MenuPage from "./Pages/MenuPage";
import OrderHistoryPage from "./Pages/OrderHistoryPage";
import AttendancePage from "./Pages/AttendancePage";
import ProfilePage from "./Pages/ProfilePage";
import BillingPage from "./Pages/BillingPage";
import ProviderLayout from "./Layout/ProviderLayout";
import ProviderUsersPage from "./Pages/ProviderDashboard/ProviderUsersPage";
import ProviderOrdersPage from "./Pages/ProviderDashboard/ProviderOrdersPage";
import ProviderDashboardPage from "./Pages/ProviderDashboard/ProviderDashboardPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ForgotPass from "./Components/ForgotPass";
import ResetPass from "./Pages/ResetPass";
import CustomerProtector from "./Layout/CustomerProtector";
import ProviderProtector from "./Layout/ProviderProtector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,path:"/", element: <LandingPage /> },     
      { path: "login", element: <LoginPage /> },  
      { path: "signup", element: <SignupPage /> },  
      { path: "email-verification", element : <EmailVerificationPage/> },
      { path: "forgot-password", element : <ForgotPass/> },
      { path: "reset-password", element : <ResetPass/> }
    ],
  },  

  {
    element: <CustomerProtector />,
    children: [
    {
    path: "/u",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "orders", element: <OrderHistoryPage /> },
      { path: "attendance", element: <AttendancePage /> },
      { path: "profile" , element: <ProfilePage />},
      { path: "billing" , element: <BillingPage />}
    ],
    },
  ]},

  {
    element: <ProviderProtector />,
    children: [{
        path: "/a",
        element: <ProviderLayout />,
        children: [
            { index: true, element: <ProviderDashboardPage /> },
            { path: "orders", element: <ProviderOrdersPage /> },
            { path: "users", element: <ProviderUsersPage /> },
            { path: "profile", element: <ProfilePage /> }, 
        ],
    },
  ]}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
