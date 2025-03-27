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
      <header className="App-header">Brikli AI</header>

      <motion.img
        src="https://media.istockphoto.com/id/1295925635/photo/hong-kong-central-district-skyscrapers.jpg?s=612x612&w=0&k=20&c=SdWN-k-hajMSr9YEsf6_TEc0rXKc0XIjpdA7llQCjNs="
        alt="City Skyline"
        className="homepageImage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

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

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion">
          <div className="accordion-item">
            <button className="accordion-button">
              What is AI Leasing?
            </button>
            <div className="accordion-content">
              <p>AI Leasing is the use of artificial intelligence to automate and optimize lease management and decisions.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-button">
              How can I use this platform?
            </button>
            <div className="accordion-content">
              <p>You can manage lease data, get renewal predictions, and send notifications to tenants through our platform.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-button">
              Is this platform secure?
            </button>
            <div className="accordion-content">
              <p>Yes, we ensure that all data is stored securely with encryption and only authorized users have access.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="partners-section">
        <h2>Our Partners</h2>
        <div className="partners-slider">
          <motion.div
            className="partner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="https://via.placeholder.com/150x100?text=Partner+1" alt="Partner 1" />
          </motion.div>
          <motion.div
            className="partner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img src="https://via.placeholder.com/150x100?text=Partner+2" alt="Partner 2" />
          </motion.div>
          <motion.div
            className="partner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <img src="https://via.placeholder.com/150x100?text=Partner+3" alt="Partner 3" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
