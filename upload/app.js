const link =
  "mongodb+srv://medineshkumarm:am6pWSIF9hVrrlVM@cluster0.5s0ha.mongodb.net/fileUploadDB";
// // server.js
// // server.js

// const express = require("express");
// const multer = require("multer");
// const xlsx = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = 3000;

// // MongoDB connection
// mongoose
//   .connect(link, {
//     // Update the connection string as needed
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected..."))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Define a schema and model for transactions
// const transactionSchema = new mongoose.Schema(
//   {
//     date: {
//       type: Date,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paymentType: {
//       type: String,
//       enum: ["cash", "card", "online"],
//       required: true,
//     },
//     shopName: {
//       type: String,
//       required: true,
//     },
//     shop: {
//       type: mongoose.Schema.Types.ObjectId, // Reference to the shop
//       ref: "shop", // Links this transaction to a specific shop
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Transaction = mongoose.model("transaction", transactionSchema);

// // Set up storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); // Directory to save the uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file
//   },
// });

// // Initialize multer
// const upload = multer({ storage });

// // Ensure uploads directory exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // Route for uploading JSON or Excel files
// app.post("/upload", upload.single("file"), async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const filePath = path.join(__dirname, "uploads", file.filename);
//   const fileType = path.extname(file.originalname).toLowerCase();

//   try {
//     if (fileType === ".json") {
//       // Process JSON file
//       const data = fs.readFileSync(filePath, "utf8");
//       const jsonData = JSON.parse(data);

//       // Save each transaction to the database
//       await Transaction.insertMany(jsonData);
//       res.status(200).send("Transactions uploaded successfully.");
//     } else if (fileType === ".xlsx" || fileType === ".xls") {
//       // Process Excel file
//       const workbook = xlsx.readFile(filePath);
//       const sheetNames = workbook.SheetNames;
//       const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

//       // Save each transaction to the database
//       await Transaction.insertMany(jsonData);
//       res.status(200).send("Transactions uploaded successfully.");
//     } else {
//       return res
//         .status(400)
//         .send("Invalid file type. Please upload a JSON or Excel file.");
//     }
//   } catch (error) {
//     console.error("Error processing file:", error);
//     res.status(500).send("Error processing file.");
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// server.js

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// Define schemas and models
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentType: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
    shopName: { type: String, required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop", required: true },
  },
  { timestamps: true }
);

const shopSchema = new Schema(
  {
    shopName: { type: String, required: true },
    location: { type: String, required: true },
    shopNo: { type: String, required: true },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "transaction" },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false },
    password: { type: String, required: true },
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "shop" }],
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);
const Shop = mongoose.model("shop", shopSchema);
const User = mongoose.model("user", userSchema);

// Initialize the Express app
const app = express();
const PORT = 3000;
const cors = require("cors");

// Middleware for JSON parsing
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML file)
app.use(express.static(path.join(__dirname)));

// Middleware for authentication (dummy example)
const isAuthenticated = (req, res, next) => {
  // Replace with actual authentication logic
  req.user = { id: "67056d97fa992cd4f9d6d454" }; // Mock user ID for demo purposes
  next();
};

// MongoDB connection
mongoose
  .connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// Initialize multer
const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Route for uploading JSON or Excel files
app.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = path.join(__dirname, "uploads", file.filename);
    const fileType = path.extname(file.originalname).toLowerCase();

    try {
      let transactionsToInsert = [];
      if (fileType === ".json") {
        // Process JSON file
        const data = fs.readFileSync(filePath, "utf8");
        transactionsToInsert = JSON.parse(data);
      } else if (fileType === ".xlsx" || fileType === ".xls") {
        // Process Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const jsonData = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetNames[0]]
        );
        transactionsToInsert = jsonData;
      } else {
        return res
          .status(400)
          .send("Invalid file type. Please upload a JSON or Excel file.");
      }

      for (const transaction of transactionsToInsert) {
        const existingShop = await Shop.findOne({
          shopName: transaction.shopName,
          user: req.user.id,
        });

        if (existingShop) {
          // Proceed to save transaction
          const newTransaction = new Transaction({
            date: transaction.date,
            amount: transaction.amount,
            paymentType: transaction.paymentType,
            shopName: transaction.shopName,
            shop: existingShop._id, // Use the existing shop's ID
          });
          await newTransaction.save();
          existingShop.transactions.push(newTransaction._id);
          await existingShop.save(); // Update shop with new transaction
        } else {
          // Prompt user to add the shop or skip
          return res
            .status(400)
            .send(
              `Shop "${transaction.shopName}" not found. Please add it before uploading transactions.`
            );
        }
      }

      res.status(200).send("Transactions uploaded successfully.");
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).send("Error processing file.");
    }
  }
);

// Endpoint to add a new shop
app.post("/add-shop", isAuthenticated, async (req, res) => {
  const { shopName, location, shopNo } = req.body;

  if (!shopName || !location || !shopNo) {
    return res.status(400).send("All fields are required to add a new shop.");
  }

  const newShop = new Shop({
    shopName,
    location,
    shopNo,
    user: req.user.id, // Link the shop to the authenticated user
  });

  await newShop.save();
  res.status(201).send("Shop added successfully.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
