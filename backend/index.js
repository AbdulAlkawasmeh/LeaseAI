const express = require("express");
const cors = require("cors");
const app = express();  // Define app after importing express
const db = require("./models");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
require('./config/database'); // Load the database connection

// Set up CORS to allow requests from your frontend URL
app.use(cors({
  origin: 'https://leaseai.netlify.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Import and use the postRouter for handling post requests
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter); // Use the postRouter for /posts route

// Notification route (keep this if you need it)
app.post("/send-notification", async (req, res) => {
  const { tenantEmail, tenantName, rentAmount, leaseStartDate, leaseEndDate } = req.body;

  if (!tenantEmail) {
    return res.status(400).json({ error: "No email provided" });
  }

  const msg = {
    to: tenantEmail, 
    from: process.env.FROM_EMAIL, 
    subject: "Rent Notification - Payment Reminder",
    text: `Hello ${tenantName}, your rent of $${rentAmount} is due. Lease: ${leaseStartDate} - ${leaseEndDate}.`,
    html: `<h1>Rent Notification</h1>
           <p>Dear <strong>${tenantName}</strong>,</p>
           <p>Your rent payment of <strong>$${rentAmount}</strong> is due.</p>
           <p><strong>Lease Period:</strong> ${leaseStartDate} - ${leaseEndDate}</p>
           <p>Please make sure to complete your payment on time.</p>
           <p>Thank you!</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Notification email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    res.status(500).json({ error: "Failed to send email", details: error.response?.body || error.message });
  }
});

// Sync database and start server
const port = process.env.PORT || 3001;  // Use Heroku's port or default to 3001
db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
