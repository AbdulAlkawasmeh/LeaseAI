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
          <button className="cta-button" onClick={() => navigate("/createpost")}>Get Started</button>
        </div>
      </header>

      {/* About Us Section */}
      <section className="about-us">
        <h2 className="section-title">About Us</h2>
        <p className="section-text">
          Lease AI is an innovative platform designed to simplify lease management. 
          We use AI to track lease expirations, predict renewal probabilities, and automate 
          tenant communication, helping landlords manage their properties effortlessly.
        </p>
        <motion.img
          src="https://via.placeholder.com/800x400?text=About+Us+Image"
          alt="About Us"
          className="section-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-row">
          <div className="step-box">
            <h3>1. Landlord Inputs Data</h3>
            <p>Add tenant details, lease terms, and rent amounts.</p>
          </div>
          <div className="step-box">
            <h3>2. Data Stored Securely</h3>
            <p>All lease data is stored in a secure database.</p>
          </div>
          <div className="step-box">
            <h3>3. Status Tracking</h3>
            <p>Active leases are tracked in real-time.</p>
          </div>
        </div>
        <div className="steps-row">
          <div className="step-box">
            <h3>4. Expiring Lease Alerts</h3>
            <p>The system marks leases nearing expiration.</p>
          </div>
          <div className="step-box">
            <h3>5. Email Notifications</h3>
            <p>Landlords can send automated reminders to tenants.</p>
          </div>
        </div>
        <motion.img
          src="https://img.freepik.com/premium-vector/how-it-works-flat-concept-vector-icon-ask-question-idea-cartoon-color-illustrations-set-customer-support-service-online-helpdesk-faq-contact-us-tech-assistance-isolated-graphic-design-element_106317-13303.jpg?semt=ais_hybrid"
          alt="How It Works"
          className="section-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
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
