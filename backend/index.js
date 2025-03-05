require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const app = express(); 
app.use(express.json());
app.use(cors()); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require("./models"); 


const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

app.post("/send-notification", async (req, res) => {
  try {
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

    await sgMail.send(msg);
    res.status(200).json({ message: "Notification email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
    res.status(500).json({ error: "Failed to send email", details: error.response?.body || error.message });
  }
});

const port = process.env.PORT || 3001;

db.sequelize.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
