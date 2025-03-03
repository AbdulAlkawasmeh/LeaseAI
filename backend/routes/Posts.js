const express = require("express");
const { spawn } = require("child_process"); 
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const ListOfPosts = await Posts.findAll();
    res.json(ListOfPosts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/predict", (req, res) => {
  const { previous_renewals, lease_duration } = req.body;

  const pythonProcess = spawn("python", ["backend/train_model.py", previous_renewals, lease_duration]);

  pythonProcess.stdout.on("data", (data) => {
    const prediction = data.toString().trim();
    res.json({ prediction });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: "AI prediction failed" });
  });
});

router.get("/search", async (req, res) => {
  try {
    let { tenantName, tenantEmail } = req.query;

    tenantName = tenantName ? tenantName.trim() : "";
    tenantEmail = tenantEmail ? tenantEmail.trim().toLowerCase() : "";

    const whereClause = {};
    if (tenantName) whereClause.tenantName = tenantName;
    if (tenantEmail) whereClause.tenantEmail = tenantEmail;

    const leases = await Posts.findAll({ where: whereClause });

    if (leases.length > 0) {
      res.json(leases);
    } else {
      res.status(404).json({ message: "User does not exist." });
    }
  } catch (error) {
    console.error("Error searching leases:", error);
    res.status(500).json({ message: "Error fetching lease information" });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create lease post" });
  }
});

router.delete("/delete-all", async (req, res) => {
  try {
    await Posts.destroy({ where: {} });
    res.json({ message: "All posts deleted successfully!" });
  } catch (error) {
    console.error("Error deleting posts:", error);
    res.status(500).json({ error: "Failed to delete posts", details: error.message });
  }
});

module.exports = router;
