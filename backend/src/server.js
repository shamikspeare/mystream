import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
dotenv.config();

import authRoutes from './routes/auth.router.js' //importing the router and giving it a name
import userRoutes from './routes/user.router.js'
import chatRoutes from './routes/chat.router.js'

import {connectDB} from './lib/db.js'

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin : "http://localhost:5173",
    credentials:true //allow frontend to send cookies
}));

app.use(express.json()); // middleware that handles the json 
app.use(cookieParser());

app.use("/api/auth", authRoutes); // middleware that calls the routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT ,()=>{
    console.log(`server running on port ${PORT}`);
    connectDB();
});