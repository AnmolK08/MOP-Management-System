import { Outlet } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";

const AppLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default AppLayout;
