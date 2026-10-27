import {createServer} from "node:http";
import express from "express";
import dotnet from "dotenv";
import bodyParser from "body-parser"
import cors from "cors";
import configDb from "./config/db.js"
import authRouter from './route/authRoute.js'
import courseRouter from './route/courseRoute.js'
import userRouter from './route/userRoute.js';
const path = require('path');
dotnet.config()
configDb()
const port = process.env.PORT || 8080;
const app = express()
app.use(express.static(path.join(__dirname, './dist'))); 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});
// const server = createServer((request,response) => {
//     if(request.url == '/') {
//         response.writeHead(200,{
//             "content-type": "text/plain"
//         })
//         response.end("hello how are u")
//     }
//     else if(request.url == '/about') {
//         response.writeHead(200,{
//             "content-type": "application/json"
//         })
//         response.end(JSON.stringify({"message":"Hello"}))
//         response.end("hello how are u")
//     }
// })
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logger);
app.use(cors());
app.use(bodyParser.json())

app.get("/", (req, res) => {
  console.log("hello");
  res.status(200).send("Hello from the server");
});

app.get("/about", (req, res) => {
  res.status(200).json({
    message: "About page",
    success: true,
  }); 
});

app.use('/auth',authRouter);
app.use('/courses', courseRouter);
app.use('/user', userRouter);
// app.get('/mySession',mySession)
// app.use('/auth',auth)
app.listen(port , ()=> {
console.log(`running on  http://localhost:${port}`)
})

export default app;