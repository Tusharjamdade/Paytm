const express = require("express");
const app = express();
const v1Router = require("./routes/index");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 3000;


//middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("api/v1", v1Router);

app.listen(port, (req, res) => {
  console.log(`Listening.. on port Number ${port}`);
});
