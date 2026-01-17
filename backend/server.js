import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import donorRoutes from "./routes/donorRoutes.js";
import Donor from "./models/donorModel.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "https://mohipal-donater-group.vercel.app",
  "http://localhost:3000",
  "https://mohipal-donater-group.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default corsOptions;


// --- Ensure uploads folder exists ---
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup with safe filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");
    cb(null, Date.now() + "-" + safeName);
  },
});
const upload = multer({ storage });

// admin pass setup
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

console.log("Loaded Admin Password:", ADMIN_PASSWORD);
app.post("/api/admin/login", (req, res) => {
  console.log("Admin entered:", req.body.password);
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid password" });
});

// POST donor with image
app.post("/api/donors", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const donor = new Donor({
      name: req.body.name,
      bloodGroup: req.body.bloodGroup,
      location: req.body.location,
      phone: req.body.phone,
      image: req.file.filename,
    });

    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    console.log("POST donor ERROR:", err);
    res.status(500).json({ message: "Error adding donor" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our Mohipal blood donor api.");
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// GET + DELETE routes
app.use("/api/donors", donorRoutes);

// MongoDB connection
mongoose
  .connect(url)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
