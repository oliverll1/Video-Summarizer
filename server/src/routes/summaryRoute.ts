const express = require("express");
const router = express.Router();
const { getSummary, addSummary } = require("../controllers/summaryController");

const multer = require('multer');

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store file in memory (you can customize this based on your needs)

const upload = multer({ storage: storage });

router.get("/", getSummary);
router.post("/add", upload.single('audioFile'), addSummary);

module.exports = router;
