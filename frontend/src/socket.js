import { io } from "socket.io-client";

let socket;
const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:8080";

export const initSocket = (user) => {
  
  socket = io(BACKEND_URL,{
    query:{
      userId:user.userId
    }
  });
};

export const getSocket = () => socket;