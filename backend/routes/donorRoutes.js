import express from "express";
import Donor from "../models/donorModel.js";

const router = express.Router();

// GET all donors + search
router.get("/", async (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : "";

  try {
    const donors = await Donor.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { bloodGroup: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ],
    }).select("-image"); // image buffer বাদ

    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching donors" });
  }
});

// DELETE donor
router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting donor" });
  }
});

export default router;
