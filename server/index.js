require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const router = require('./router');
const io = require("socket.io")(server, {
  cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  }
});


//TODO: make good use of these
const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// handling CORS
// app.use(cors(
//   {
//     origin: CLIENT_URL,
//   }
// ));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin",
//     CLIENT_URL);
//   res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.json());
app.use(router);

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
