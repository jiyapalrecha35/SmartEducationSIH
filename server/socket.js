const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const { connectToDB } = require("./db/db");
const { Chats } = require('./models/models');

const PORT = 1001;
const URL = 'mongodb://127.0.0.1:27017/sih2023';
app.use(cors());
const server = http.createServer(app);
const users = {};

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
      users[socket.id] = data.name;
      console.log(data.room);
      socket.join(data.room);
      Chats.find({room : data.room},{_id : 0, name : 1, message : 1})
          .then(result => {
              io.to(socket.id).emit('join_conf',result);
          })
          .catch(err => {
              console.log(err);
          })
    });
  
    socket.on("send_message", (data) => {
      console.log(data);
      console.log('message  ',users[socket.id]);
      console.log(data.message);
      socket.to(data.room).emit("receive_message", data);
      const chat = new Chats({
          room : data.room,
          email : data.userEmail,
          message : data.message,
          name : data.name
      });
      chat.save()
          .then(()=>{
              console.log('Token');
          })
          .catch((err)=>{
              console.log(err);
          })
    });
  });

(async function (){
    await connectToDB(URL);
})();

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING");
});