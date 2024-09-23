const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.route");

dotenv.config();
// database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));
// routes

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
