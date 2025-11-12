import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "../Redux/Slices/authSlice";
import { getSocket, initSocket } from "../socket";
import LoadingScreen from "../Components/LoadingScreen";

function ProviderProtector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      
      if(!user?.id) return
      
      initSocket({userId:user.id});
      const socket = getSocket();
  
      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });
  
      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
  
      return () => {
        socket.disconnect();
      };
    }, [user?.id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!user) {
      dispatch(fetchUser()).then((res) => {
        if (res.error) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
        else if (res.payload.data.role !== "PROVIDER") {
          navigate("/u", { replace: true });
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, navigate, user]);

  if (loading || !user || user.role!=="PROVIDER" ) return <LoadingScreen />;

  return <Outlet />; 
}


export default ProviderProtector;