import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 
import moment from "moment";
import "./Home.css"; 
import { Link } from "react-router-dom"; 

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts") 
      .then((response) => {
        console.log("Fetched Posts:", response.data); // Debugging log
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
      const response = await axios.post("http://localhost:3001/send-notification", {
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

            {/* Display AI prediction */}
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
  );
}

export default Home;
