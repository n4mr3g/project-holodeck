require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middleware/errorHandler.middleware');
const authMiddleware = require('./middleware/auth.middleware');

const PORT = process.env.SERVER_PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();


// CORS
const allowedOrigins = [CLIENT_URL];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// middleware
app
.use(express.json())
.use(authMiddleware)
.use(router)
.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
