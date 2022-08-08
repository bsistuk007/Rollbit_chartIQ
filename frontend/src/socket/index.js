import { io } from "socket.io-client";

const socketInit = ()=>{
    const options = {
        "force new connection": true,
        reconnectionAttempt: "Infinity",
        timeout: 100000,
        transport: ["websocket"],
        secure: true,
        rejectUnauthorized: false,
      };

    return io('http://localhost:3006',options);
}


export default socketInit;
