import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
};

function TenantPage() {
  const [leaseDetails, setLeaseDetails] = useState(null);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tenant Name is required!"),
    email: Yup.string().email("Invalid email format").required("Tenant Email is required!"),
  });

  const handleTenantInfoSubmit = async (values) => {
    let { name, email } = values;

    name = name.trim();
    email = email.trim().toLowerCase();

    try {
      const response = await axios.get("https://leaseai-production.up.railway.app/posts/search", {
        params: { tenantName: name, tenantEmail: email },
      });

      if (response.data.length > 0) {
        setLeaseDetails(response.data[0]);
        setMessage("");
      } else {
        setMessage("No lease found for this tenant.");
        setLeaseDetails(null);
      }
    } catch (error) {
      console.error("Error fetching tenant lease info:", error);
      setMessage("Error fetching lease information.");
      setLeaseDetails(null);
    }
  };

  const handleRenewLease = async () => {
    if (!leaseDetails) return;
    try {
      const response = await axios.post(`https://leaseai-backend-production.up.railway.app/posts/renew/${leaseDetails.id}`);
      setLeaseDetails(response.data.lease); 
      setMessage("Lease renewed successfully!");
    } catch (error) {
      console.error("Error renewing lease:", error);
      setMessage("Failed to renew lease.");
    }
  };

  const handleCancelLease = async () => {
    if (!leaseDetails) return;
    try {
      await axios.delete(`/posts/cancel/${leaseDetails.id}`);
      setLeaseDetails(null); 
      setMessage("Lease canceled successfully!");
    } catch (error) {
      console.error("Error canceling lease:", error);
      setMessage("Failed to cancel lease.");
    }
  };

  return (
    <div className="tenant-container">
      <h1>Tenant Lease Management</h1>

      <Formik initialValues={{ name: "", email: "" }} validationSchema={validationSchema} onSubmit={handleTenantInfoSubmit}>
        <Form>
          <div>
            <Field type="text" name="name" placeholder="Enter Tenant Name" className="input-field" />
            <ErrorMessage name="name" component="span" className="error-message" />
          </div>

          <div>
            <Field type="email" name="email" placeholder="Enter Tenant Email" className="input-field" />
            <ErrorMessage name="email" component="span" className="error-message" />
          </div>

          <button type="submit">Search Lease</button>
        </Form>
      </Formik>

      {leaseDetails && (
        <div className="lease-details">
          <h2>Lease Details</h2>
          <p><strong>Name:</strong> {leaseDetails.tenantName}</p>
          <p><strong>Email:</strong> {leaseDetails.tenantEmail}</p>
          <p><strong>Lease End Date:</strong> {formatDate(leaseDetails.leaseEndDate)}</p>
          <p><strong>Renewal Status:</strong> {leaseDetails.prediction || "Unknown"}</p>

          <button className="btn btn-green" onClick={handleRenewLease}>Renew Lease</button>
          <button className="btn btn-red" onClick={handleCancelLease}>Cancel Lease</button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default TenantPage;
