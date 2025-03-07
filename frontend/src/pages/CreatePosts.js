import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreatePost.css"; 

function CreatePost() {
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
    axios.post("https://leaseai-production.up.railway.app/posts", data).then((response) => {
      console.log("Data submitted:", response.data);
      alert("Tenant information submitted!");
      resetForm();
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Tenant Name:</label>
          <ErrorMessage name="tenantName" component="span" />
          <Field
            autoComplete="off"
            name="tenantName"
            placeholder="Enter Tenant Name"
          />

          <label>Tenant Email:</label>  
          <ErrorMessage name="tenantEmail" component="span" />
          <Field
            autoComplete="off"
            type="email"
            name="tenantEmail"
            placeholder="Enter Tenant Email"
          />

          <label>Rent Amount:</label>
          <ErrorMessage name="rentAmount" component="span" />
          <Field
            autoComplete="off"
            type="number"
            name="rentAmount"
            placeholder="Enter Rent Amount"
          />

          <label>Lease Start Date:</label>
          <ErrorMessage name="leaseStartDate" component="span" />
          <Field type="date" name="leaseStartDate" />

          <label>Lease End Date:</label>
          <ErrorMessage name="leaseEndDate" component="span" />
          <Field type="date" name="leaseEndDate" />

          <button type="submit">Submit Tenant Info</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;