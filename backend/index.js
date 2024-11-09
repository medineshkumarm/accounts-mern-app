const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
// const react_url = process.env.FRONTEND_URL;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

//models:

//router imports:
const { authMiddleware } = require("./middleware/auth-middleware");

const transactionRoute = require("./routes/transaction-route");
const userRoute = require("./routes/user-routes");
const shopRoute = require("./routes/shop-routes");
const authRoute = require("./routes/authRoutes");
const statsRoute = require("./routes/statsRoutes");
//routes:
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// Use the routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/shops", shopRoute);
app.use("/api/transactions", transactionRoute);

app.use("/api", authMiddleware, statsRoute);

//uploaded profile picture:
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server Error",
  });
};

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Server listening at PORT: ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log("Error Occured :" + error);
  });
