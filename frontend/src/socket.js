import { io } from "socket.io-client";

let socket;

export const initSocket = (user) => {
  
  socket = io("http://localhost:8080",{
    query:{
      userId:user.userId
    }
  });
};

export const getSocket = () => socket;