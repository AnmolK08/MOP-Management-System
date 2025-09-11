import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <div>
      
      <Outlet />
      <Toaster />
    </div>
   
             
   
  );
};

export default AppLayout;
