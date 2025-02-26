import React, { useEffect, useState } from "react";
import axios from "axios";
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

  
  const handleDeleteAllPosts = async () => {
    try {
      await axios.delete("http://localhost:3001/posts/delete-all"); 
      setListOfPosts([]); 
      alert("All posts deleted successfully!");
    } catch (error) {
      console.error("Error deleting posts:", error);
      alert("Failed to delete posts.");
    }
  };

  
  const handleNotifyClick = async (post) => {
    if (!post.tenantEmail) {
      alert("No email available for this tenant.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/send-notification", {
        tenantEmail: post.tenantEmail,
        tenantName: post.tenantName,
        rentAmount: post.rentAmount,
        leaseStartDate: post.leaseStartDate,
        leaseEndDate: post.leaseEndDate,
      });

      alert(response.data.message); 
    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.message);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">Brikli AI</header>
      
      {/* ✅ Fixed Clear Posts Button */}
      <button className="clearButton" onClick={handleDeleteAllPosts}>Clear Posts</button>

      {listOfPosts.map((post) => (
        <div className="post" key={post.id}>
          <div className="tenantName">Tenant: {post.tenantName}</div>
          <div className="tenantEmail">Email: {post.tenantEmail}</div>
          <div className="rentAmount">Rent Amount: ${post.rentAmount}</div>
          <div className="leaseStartDate">Lease Start: {post.leaseStartDate}</div>
          <div className="leaseEndDate">Lease End: {post.leaseEndDate}</div>
          <button
            className="notifyButton"
            onClick={() => handleNotifyClick(post)} 
          >
            Notify
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
