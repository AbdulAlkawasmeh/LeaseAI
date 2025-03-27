import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 
import moment from "moment";
import "./Home.css"; 

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://leaseai-backend-production.up.railway.app/posts") 
      .then((response) => {
        console.log("Fetched Posts:", response.data); 
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const isExpiringSoon = (leaseEndDate) => {
    const daysLeft = moment(leaseEndDate).diff(moment(), 'days');
    return daysLeft <= 60;
  };

  const sendNotification = async (post) => {
    try {
      const response = await axios.post("https://leaseai-backend-production.up.railway.app/send-notification", {
        tenantEmail: post.tenantEmail,
        tenantName: post.tenantName,
        rentAmount: post.rentAmount,
        leaseStartDate: post.leaseStartDate,
        leaseEndDate: post.leaseEndDate,
      });

      alert("Notification sent successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        Brikli AI
      </header>
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Brikli AI</h1>
        <p>AI-powered solutions for lease management</p>
      </motion.div>

      {/* Partners Section */}
      <div className="partners-section">
        <h2>Our Trusted Partners</h2>
        <motion.div
          className="partners-carousel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <img src="partner-logo1.png" alt="Partner 1" />
          <img src="partner-logo2.png" alt="Partner 2" />
          <img src="partner-logo3.png" alt="Partner 3" />
          <img src="partner-logo4.png" alt="Partner 4" />
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion">
          <div className="accordion-item">
            <button className="accordion-header">What is Brikli AI?</button>
            <div className="accordion-body">
              Brikli AI provides AI-powered tools to assist in managing lease agreements.
            </div>
          </div>
          <div className="accordion-item">
            <button className="accordion-header">How does AI help with lease management?</button>
            <div className="accordion-body">
              Our AI detects lease renewal patterns and sends automated reminders to tenants and property managers.
            </div>
          </div>
          <div className="accordion-item">
            <button className="accordion-header">How can I use Brikli AI?</button>
            <div className="accordion-body">
              You can integrate Brikli AI into your property management system or use it independently for lease tracking.
            </div>
          </div>
        </div>
      </div>

      {/* Post Section */}
      <div className="content">
        {listOfPosts.length === 0 ? (
          <p>No lease data available.</p>
        ) : (
          listOfPosts.map((post) => (
            <div className="post" key={post.id}>
              <div className="tenantName">Tenant: {post.tenantName}</div>
              <div className="tenantEmail">Email: {post.tenantEmail}</div>
              <div className="rentAmount">Rent Amount: ${post.rentAmount}</div>
              <div className="leaseStartDate">Lease Start: {moment(post.leaseStartDate).format("MM/DD/YYYY")}</div>
              <div className="leaseEndDate">Lease End: {moment(post.leaseEndDate).format("MM/DD/YYYY")}</div>

              {post.prediction ? (
                <div className="predictionTag" style={{ backgroundColor: post.prediction === "Likely to Renew" ? "yellow" : "gray" }}>
                  {post.prediction}
                </div>
              ) : (
                <div className="predictionTag" style={{ backgroundColor: "lightgray" }}>
                  No Prediction
                </div>
              )}

              {isExpiringSoon(post.leaseEndDate) && (
                <div className="expiringTag" style={{ backgroundColor: "red" }}>Expiring soon</div>
              )}

              <button className="notifyButton" onClick={() => sendNotification(post)}>
                Notify
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
