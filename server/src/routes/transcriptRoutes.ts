import express from "express";
import { getSummary, addSummary } from "../controllers/transcriptController";
import multer from 'multer';
const router = express.Router();


// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store file in memory (you can customize this based on your needs)

const upload = multer({ storage: storage });

router.get("/", getSummary);
router.post("/add", upload.single('audioFile'), addSummary);

module.exports = router;
