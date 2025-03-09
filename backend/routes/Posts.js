const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();
const { Posts } = require("../models");
const sgMail = require("@sendgrid/mail");
const cors = require('cors');

//const postsRouter = require('./routes/Posts');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Use the postsRouter for routes starting with '/posts'
//app.use('/posts', postsRouter);

router.get("/", async (req, res) => {
  try {
    const ListOfPosts = await Posts.findAll();
    res.json(ListOfPosts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/renew/:id", async (req, res) => {
  try {
    const lease = await Posts.findByPk(req.params.id);
    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }

    const newLeaseEndDate = new Date(lease.leaseEndDate);
    newLeaseEndDate.setMonth(newLeaseEndDate.getMonth() + 12); 

    lease.leaseEndDate = newLeaseEndDate;
    lease.previous_renewals = (lease.previous_renewals || 0) + 1; 
    lease.prediction = lease.previous_renewals >= 3 ? "Likely to Renew" : "Unlikely to Renew"; 

    await lease.save();
    res.json({ message: "Lease renewed successfully", lease });
  } catch (error) {
    console.error("Error renewing lease:", error);
    res.status(500).json({ error: "Failed to renew lease" });
  }
});

router.delete("/cancel/:id", async (req, res) => {
  try {
    const lease = await Posts.findByPk(req.params.id);
    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }

    await lease.destroy();
    res.json({ message: "Lease canceled successfully" });
  } catch (error) {
    console.error("Error canceling lease:", error);
    res.status(500).json({ error: "Failed to cancel lease" });
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

sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

router.post("/send-notification", async (req, res) => {
  const { tenantEmail, tenantName, rentAmount, leaseStartDate, leaseEndDate } = req.body;

  if (!tenantEmail) {
    return res.status(400).json({ error: "No email provided" });
  }

  const msg = {
    to: tenantEmail, 
    from: { email: process.env.FROM_EMAIL, name: 'BrikliAI' }, 
    subject: "Rent Notification",
    text: `Dear ${tenantName},\n\nThis is a reminder that your rent of $${rentAmount} is due.\nLease Period: ${leaseStartDate} - ${leaseEndDate}.\n\nThank you.`,
  };
  

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Notification email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
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
