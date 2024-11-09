const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Storing file in memory for immediate parsing
const upload = multer({ storage: storage });

// Route to handle file upload
app.post("/api/uploadExcel", upload.single("file"), (req, res) => {
  try {
    // You can process the file here, if needed
    // Since we're previewing on the frontend, minimal processing might be necessary
    console.log("File received:", req.file.originalname);

    // Respond with success
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Error processing file" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
