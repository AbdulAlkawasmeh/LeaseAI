import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import "./CreatePost.css";

function CreatePost() {
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
    const daysLeft = moment(leaseEndDate).diff(moment(), "days");
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

  const initialValues = {
    tenantName: "",
    tenantEmail: "",
    rentAmount: "",
    leaseStartDate: "",
    leaseEndDate: "",
  };

  const validationSchema = Yup.object().shape({
    tenantName: Yup.string().required("Tenant Name is required!"),
    tenantEmail: Yup.string()
      .email("Invalid email format")
      .required("Tenant Email is required!"),
    rentAmount: Yup.number()
      .positive("Rent amount must be positive")
      .required("Rent Amount is required!"),
    leaseStartDate: Yup.date().required("Lease Start Date is required!"),
    leaseEndDate: Yup.date().required("Lease End Date is required!"),
  });

  const onSubmit = (data, { resetForm }) => {
    axios.post("https://leaseai-backend-production.up.railway.app/posts", data).then((response) => {
      console.log("Data submitted:", response.data);
      alert("Tenant information submitted!");
      resetForm();
    });
  };

  return (
    <div className="createPostPage">
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

      {/* Lease Data Form */}
      <section className="formSection">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <h2>Enter Lease Data</h2>
            <label>Tenant Name:</label>
            <ErrorMessage name="tenantName" component="span" />
            <Field autoComplete="off" name="tenantName" placeholder="Enter Tenant Name" />

            <label>Tenant Email:</label>
            <ErrorMessage name="tenantEmail" component="span" />
            <Field autoComplete="off" type="email" name="tenantEmail" placeholder="Enter Tenant Email" />

            <label>Rent Amount:</label>
            <ErrorMessage name="rentAmount" component="span" />
            <Field autoComplete="off" type="number" name="rentAmount" placeholder="Enter Rent Amount" />

            <label>Lease Start Date:</label>
            <ErrorMessage name="leaseStartDate" component="span" />
            <Field type="date" name="leaseStartDate" />

            <label>Lease End Date:</label>
            <ErrorMessage name="leaseEndDate" component="span" />
            <Field type="date" name="leaseEndDate" />

            <button type="submit">Submit Tenant Info</button>
          </Form>
        </Formik>
      </section>

      {/* Lease Data Display */}
      <section className="posts-section">
        <h2>Lease Data</h2>
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
      </section>
    </div>
  );
}

export default CreatePost;
