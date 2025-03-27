import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <motion.img
          src="https://media.istockphoto.com/id/1295925635/photo/hong-kong-central-district-skyscrapers.jpg?s=612x612&w=0&k=20&c=SdWN-k-hajMSr9YEsf6_TEc0rXKc0XIjpdA7llQCjNs="
          alt="Skyscraper"
          className="hero-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="hero-text">
          <h1>Lease AI - Revolutionizing Lease Management</h1>
          <p>Automate and optimize your lease management with our AI-powered platform.</p>
          <button className="cta-button" onClick={() => navigate("/create-posts")}>Get Started</button>
        </div>
      </header>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          Lease AI is an innovative platform designed to simplify lease management. 
          We use AI to track lease expirations, predict renewal probabilities, and automate 
          tenant communication, helping landlords manage their properties effortlessly.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ul>
          <li><strong>Landlord Inputs Data:</strong> Add tenant details, lease terms, and rent amounts.</li>
          <li><strong>Data Stored Securely:</strong> All lease data is stored in a secure database.</li>
          <li><strong>Status Tracking:</strong> Active leases are tracked in real-time.</li>
          <li><strong>Expiring Lease Alerts:</strong> The system marks leases nearing expiration.</li>
          <li><strong>Email Notifications:</strong> Landlords can send automated reminders to tenants.</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion">
          {[
            { question: "What is AI Leasing?", answer: "AI Leasing automates lease tracking, reminders, and predictions using artificial intelligence." },
            { question: "How can I use this platform?", answer: "You can add tenant details, track lease statuses, and send automated notifications to tenants." },
            { question: "Is this platform secure?", answer: "Yes, we use encryption and strict access controls to protect user data." },
          ].map((item, index) => (
            <div key={index} className="accordion-item">
              <button className="accordion-button" onClick={() => toggleAccordion(index)}>
                {item.question}
              </button>
              <div className={`accordion-content ${openIndex === index ? "open" : ""}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <h2>Our Partners</h2>
        <div className="partners-slider">
          {[
            { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
            { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
            { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
            { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
          ].map((partner, index) => (
            <motion.div key={index} className="partner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 + index * 0.5 }}>
              <img src={partner.logo} alt={partner.name} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
