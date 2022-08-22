import path from "path";
import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ACTIONS from './config/socket.js';
import COIN_BASE_URL from './config/api.js';
import bodyParser from "body-parser";
import axios from 'axios';
import http from 'http';
import { Server } from "socket.io";
import getBetStatisticsData from "./utils/betStateData.js";
import privateKeyToAddress from 'ethereum-private-key-to-address'

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
        origins: "*:*",
        methods: ["GET", "POST"],
        credentials: true,
      },
});
app.use(express.json());

// Routes go below here
app.use("/api", userRoutes);
// app.use(bodyParser.urlencoded({extended: false}));
// app.use("/api/users", userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

io.on('connection', (socket) => {
  console.log("new Connection", socket.id);
  const url = COIN_BASE_URL+'ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","APEUSDT","ADAUSDT"]';
  setInterval(async ()=>{
    try{
      const {data} = await axios.get(url);
      const resultActiveBets = await getBetStatisticsData(data);
      // for (let index = 0; index < resultActiveBets.length; index++) {
      //   const element = resultActiveBets[index];
      // }
      const emitData = {
        priceData: data,
        publicBets: resultActiveBets
      }; 
      io.emit(ACTIONS.INIT_EMIT, emitData);
      // io.emit(ACTIONS.COIN_PRICE, data);
    } catch(err) {
      console.log(err);
    }
  }, 3000)
})

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
io.listen(server);
