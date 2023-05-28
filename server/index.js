const express = require('express');
const router = require('./router');
require('dotenv').config();

const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    CLIENT_URL);
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
