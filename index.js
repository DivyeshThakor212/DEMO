const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { db } = require('./config/db');
const app = express();
app.use(express.json());

const product = require('./routes/products.routes');

dotenv.config();

const PORT = 5000

const corsOption = {
  origin: ['*'],
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1", product);

app.listen(PORT, () => {
  db();
  console.log(`Listening on port http://localhost:${PORT}`);
});


// Node JS

// index.js >> Root of project
// Middleware >> Act as a bridge between request and response
// Controller >> Main logic
// Routes >> Endpoints or URL
// Models >> Schemas 
// Utils >> Utility function
// Helpers >> 
// Config >> DB configuration
// .env