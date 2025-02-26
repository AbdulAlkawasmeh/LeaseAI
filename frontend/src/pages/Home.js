import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 
import "./Home.css"; 

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts") 
      .then((response) => {
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="App">
      
      <motion.img
        src="https://media.istockphoto.com/id/1295925635/photo/hong-kong-central-district-skyscrapers.jpg?s=612x612&w=0&k=20&c=SdWN-k-hajMSr9YEsf6_TEc0rXKc0XIjpdA7llQCjNs="
        alt="City Skyline"
        className="homepageImage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <header className="App-header">Brikli AI</header>

      {listOfPosts.map((post) => (
        <div className="post" key={post.id}>
          <div className="tenantName">Tenant: {post.tenantName}</div>
          <div className="tenantEmail">Email: {post.tenantEmail}</div>
          <div className="rentAmount">Rent Amount: ${post.rentAmount}</div>
          <div className="leaseStartDate">Lease Start: {post.leaseStartDate}</div>
          <div className="leaseEndDate">Lease End: {post.leaseEndDate}</div>
          <button className="notifyButton">Notify</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
