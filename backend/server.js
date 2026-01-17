import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import formidable from "formidable";
import fs from "fs";
import dotenv from "dotenv";

import donorRoutes from "./routes/donorRoutes.js";
import Donor from "./models/donorModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "https://mohipal-donater-group.vercel.app",
  "http://localhost:3000",
  "https://mohipal-donater-group.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// =====================
// ADD DONOR (formidable)
// =====================
app.post("/api/donors", (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ message: "Form parse error" });

    try {
      const { name, bloodGroup, location, phone } = fields;

      if (!files.image) {
        return res.status(400).json({ message: "Image is required" });
      }

      const file = files.image;

      const donor = new Donor({
        name,
        bloodGroup,
        location,
        phone,
        image: {
          data: fs.readFileSync(file.filepath),
          contentType: file.mimetype,
        },
      });

      await donor.save();
      res.status(201).json({ message: "Donor added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding donor" });
    }
  });
});

// =====================
// GET IMAGE
// =====================
app.get("/api/donors/image/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor || !donor.image || !donor.image.data) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", donor.image.contentType);
    res.send(donor.image.data);
  } catch (err) {
    res.status(500).json({ message: "Error loading image" });
  }
});

// =====================
// DONOR ROUTES
// =====================
app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Mohipal Blood Donor API");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
