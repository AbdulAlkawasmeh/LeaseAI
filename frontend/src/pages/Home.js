import React from "react";
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaDatabase, FaCheckCircle, FaEnvelope, FaUsers, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="homePage">
      {/* HERO SECTION */}
      <section className="hero-section">
        <Container className="text-center">
          <h1>AI-Powered Lease Management</h1>
          <p>Track, automate, and simplify lease management with ease.</p>
          <Link to="/create-posts">
            <Button className="hero-btn">Get Started</Button>
          </Link>
        </Container>
      </section>

      {/* ABOUT US SECTION */}
      <section className="about-us">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="section-title">ABOUT <span>OUR COMPANY</span></h2>
              <p className="section-subtitle">
                We make lease management effortless with AI automation, helping landlords track leases, send reminders, and reduce vacancies.
              </p>
            </Col>
          </Row>
          <Row className="stats-row">
            <Col md={3} className="stats-box"><FaUsers className="stats-icon" /><h3>200+</h3><p>Landlords Using LeaseAI</p></Col>
            <Col md={3} className="stats-box"><FaBuilding className="stats-icon" /><h3>160+</h3><p>Managed Properties</p></Col>
            <Col md={3} className="stats-box"><FaMapMarkerAlt className="stats-icon" /><h3>25+</h3><p>Cities Covered</p></Col>
            <Col md={3} className="stats-box"><FaUsers className="stats-icon" /><h3>1000+</h3><p>Leases Tracked</p></Col>
          </Row>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="section-title">HOW <span>IT WORKS</span></h2>
              <p className="section-subtitle">A seamless process for managing leases efficiently.</p>
            </Col>
          </Row>
          <Row className="steps-row">
            <Col md={4} className="step-box"><FaCheckCircle className="step-icon" /><h4>1. Landlord Inputs Data</h4><p>Add tenant details, lease terms, and rent amounts.</p></Col>
            <Col md={4} className="step-box"><FaDatabase className="step-icon" /><h4>2. Data Stored Securely</h4><p>All lease data is stored in a secure database.</p></Col>
            <Col md={4} className="step-box"><FaEnvelope className="step-icon" /><h4>3. Email Reminders Sent</h4><p>Expiring leases trigger automated email notifications.</p></Col>
          </Row>
        </Container>
      </section>

      {/* PARTNER LOGOS */}
      <section className="partners">
        <Container className="text-center">
          <h2 className="section-title">TRUSTED BY</h2>
          <Row className="partner-logos">
            <Col><img src="/assets/company1.png" alt="Company 1" /></Col>
            <Col><img src="/assets/company2.png" alt="Company 2" /></Col>
            <Col><img src="/assets/company3.png" alt="Company 3" /></Col>
            <Col><img src="/assets/company4.png" alt="Company 4" /></Col>
          </Row>
        </Container>
      </section>

      {/* FAQ SECTION WITH ACCORDION */}
      <section className="faq">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
            </Col>
          </Row>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Item eventKey="0">
                <Accordion.Header>How does LeaseAI help landlords?</Accordion.Header>
                <Accordion.Body>
                  LeaseAI automates lease tracking, alerts landlords of expiring leases, and sends email reminders to tenants.
                </Accordion.Body>
              </Accordion.Item>
            </Card>
            <Card>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Is my data secure?</Accordion.Header>
                <Accordion.Body>
                  Yes, we use industry-standard encryption to store and protect lease data.
                </Accordion.Body>
              </Accordion.Item>
            </Card>
            <Card>
              <Accordion.Item eventKey="2">
                <Accordion.Header>How can I get started?</Accordion.Header>
                <Accordion.Body>
                  Simply click on "Get Started" and add your first lease entry in minutes!
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        </Container>
      </section>
    </div>
  );
}

export default Home;
