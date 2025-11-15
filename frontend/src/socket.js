import { io } from "socket.io-client";

let socket;
export const initSocket = (user) => {
  
  socket = io("https://mop-management-system.onrender.com",{
    query:{
      userId:user.userId
    }
  });
};

export const getSocket = () => socket;