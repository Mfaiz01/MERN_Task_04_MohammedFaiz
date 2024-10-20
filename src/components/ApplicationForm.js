import "./ApplicationForm.css";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { jsPDF } from "jspdf";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  dob: Yup.date().required("Date of birth is required"),
  jobTitle: Yup.string().required("Please select a job title"),
  resume: Yup.mixed().required("Please upload your resume"),
  available: Yup.boolean(),
  preferredLocation: Yup.string().required("Please select a preferred location"),
});

const ApplicationForm = () => {
  const [submittedData, setSubmittedData] = useState(null); // Store the submitted data
  const [isConfirmationStep, setIsConfirmationStep] = useState(false); // Track if on the confirmation step

  // Function to download the draft as a PDF file
  const downloadDraftPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Job Application Draft", 10, 10);
    doc.text(`Full Name: ${data.name}`, 10, 20);
    doc.text(`Email: ${data.email}`, 10, 30);
    doc.text(`Phone: ${data.phone}`, 10, 40);
    doc.text(`Address: ${data.address}`, 10, 50);
    doc.text(`Date of Birth: ${data.dob}`, 10, 60);
    doc.text(`Job Title: ${data.jobTitle}`, 10, 70);
    doc.text(`Resume: ${data.resume ? data.resume.name : "No resume uploaded"}`, 10, 80);
    doc.text(`Available for Immediate Hire: ${data.available ? "Yes" : "No"}`, 10, 90);
    doc.text(`Preferred Work Location: ${data.preferredLocation}`, 10, 100);
    doc.save("draft_application.pdf");
  };

  return (
    <div className="application-form">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Job Application Form</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          jobTitle: "",
          resume: null,
          available: false,
          preferredLocation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (isConfirmationStep) {
            // Final submission
            alert("Application submitted successfully!");
            setSubmittedData(null); // Clear the submitted data after submission
            setIsConfirmationStep(false); // Reset confirmation step state
          } else {
            setSubmittedData(values); // Store the data in submittedData
            setIsConfirmationStep(true); // Go to confirmation step
          }
        }}
      >
        {({ setFieldValue, values, resetForm }) => (
          <>
            {isConfirmationStep ? (
              <div className="confirmation-dialog">
                <h3>Confirm Your Application Details</h3>
                <p><strong>Full Name:</strong> {submittedData.name}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Phone:</strong> {submittedData.phone}</p>
                <p><strong>Address:</strong> {submittedData.address}</p>
                <p><strong>Date of Birth:</strong> {submittedData.dob}</p>
                <p><strong>Job Title:</strong> {submittedData.jobTitle}</p>
                <p><strong>Available for Immediate Hire:</strong> {submittedData.available ? "Yes" : "No"}</p>
                <p><strong>Preferred Work Location:</strong> {submittedData.preferredLocation}</p>

                <div className="form-actions">
                  <button
                    type="button"
                    className="go-back-button"
                    onClick={() => {
                      setIsConfirmationStep(false); // Return to edit mode
                    }}
                  >
                    Go Back to Edit
                  </button>
                  <button
                    type="button"
                    className="confirm-submit-button"
                    onClick={() => {
                      alert("Application submitted successfully!");
                      setIsConfirmationStep(false); // Reset confirmation step
                      resetForm(); // Reset the form after submission
                      setSubmittedData(null); // Clear data
                    }}
                  >
                    Confirm and Submit
                  </button>
                </div>
              </div>
            ) : (
              <Form>
                {/* Full Name Field */}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <Field name="name" type="text" id="name" placeholder="Enter your full name" />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <Field name="email" type="email" id="email" placeholder="Enter your email address" />
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <Field name="phone" type="tel" id="phone" placeholder="Enter your phone number" />
                </div>

                {/* Address Field */}
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field name="address" type="text" id="address" placeholder="Enter your address" />
                </div>

                {/* Date of Birth Field */}
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <Field name="dob" type="date" id="dob" />
                </div>

                {/* Job Title Field */}
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title</label>
                  <Field as="select" name="jobTitle" id="jobTitle">
                    <option value="" label="Select job title" />
                    <option value="developer" label="Developer" />
                    <option value="designer" label="Designer" />
                    <option value="project_manager" label="Project Manager" />
                    <option value="qa_engineer" label="QA Engineer" />
                  </Field>
                </div>

                {/* Resume Upload Field */}
                <div className="form-group">
                  <label htmlFor="resume">Upload Resume</label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("resume", event.currentTarget.files[0]);
                    }}
                  />
                </div>

                {/* Available for Immediate Hire */}
                <div className="form-group">
                  <label htmlFor="available">Available for Immediate Hire?</label>
                  <Field name="available" type="checkbox" />
                </div>

                {/* Preferred Work Location (Radio Buttons) */}
                <div className="form-group">
                  <label>Preferred Work Location</label>
                  <div role="group" aria-labelledby="preferredLocation">
                    <label>
                      <Field type="radio" name="preferredLocation" value="remote" />
                      Remote
                    </label>
                    <label>
                      <Field type="radio" name="preferredLocation" value="on_site" />
                      On-site
                    </label>
                    <label>
                      <Field type="radio" name="preferredLocation" value="hybrid" />
                      Hybrid
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => downloadDraftPDF(values)} // Download draft as PDF
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Proceed to Confirmation
                  </button>
                </div>

                {/* Portfolio Link Section */}
                <div className="portfolio-link" style={{ textAlign: "center", marginTop: "20px" }}>
                  <a href="https://mfaiz01.github.io/MyPortfolio/" target="_blank" rel="noopener noreferrer">
                    Visit My Portfolio
                  </a>
                </div>
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationForm;
