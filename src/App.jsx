import { useState } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  qualification: "",
  skills: "",
  experience: "",
  resume: null,
  expectedSalary: "",
  coverLetter: ""
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const qualifications = [
    "Diploma",
    "BCA",
    "BSc Computer Science",
    "BSc IT",
    "B.E / B.Tech",
    "MCA",
    "MSc Computer Science",
    "MBA",
    "Other"
  ];

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required.";
        } else if (!/^[A-Za-z ]{2,60}$/.test(value.trim())) {
          error = "Enter a valid name using letters and spaces only.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email address is required.";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ) {
          error = "Enter a valid email address.";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required.";
        } else if (!/^[6-9]\d{9}$/.test(value.trim())) {
          error = "Enter a valid 10-digit phone number.";
        }
        break;

      case "qualification":
        if (!value) {
          error = "Please select your educational qualification.";
        }
        break;

      case "skills":
        if (!value.trim()) {
          error = "Please enter at least one skill.";
        } else if (value.trim().length < 3) {
          error = "Please enter valid skills.";
        }
        break;

      case "experience":
        if (value === "") {
          error = "Years of experience is required.";
        } else if (
          Number(value) < 0 ||
          Number(value) > 50
        ) {
          error = "Experience must be between 0 and 50 years.";
        }
        break;

      case "resume":
        if (!value) {
          error = "Please select a resume.";
        } else {
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ];

          const maxSize = 5 * 1024 * 1024;

          if (!allowedTypes.includes(value.type)) {
            error = "Only PDF, DOC, or DOCX files are allowed.";
          } else if (value.size > maxSize) {
            error = "Resume file size must not exceed 5 MB.";
          }
        }
        break;

      case "expectedSalary":
        if (!value) {
          error = "Expected salary is required.";
        } else if (Number(value) <= 0) {
          error = "Expected salary must be greater than 0.";
        }
        break;

      case "coverLetter":
        if (!value.trim()) {
          error = "Cover letter is required.";
        } else if (value.trim().length < 50) {
          error =
            "Cover letter must contain at least 50 characters.";
        } else if (value.trim().length > 1000) {
          error =
            "Cover letter must not exceed 1000 characters.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    const error = validateField(name, value);

    setErrors((previous) => ({
      ...previous,
      [name]: error
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0] || null;

    setFormData((previous) => ({
      ...previous,
      resume: file
    }));

    const error = validateField("resume", file);

    setErrors((previous) => ({
      ...previous,
      resume: error
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAll();

    if (isValid) {
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
  };

  const getFileName = () => {
    if (!formData.resume) {
      return "No resume selected";
    }

    return formData.resume.name;
  };

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <header className="header">
          <div className="header-icon">💼</div>

          <h1>Job Application & Profile Builder</h1>

          <p>
            Create your professional profile and apply for your
            dream job.
          </p>
        </header>

        {/* Success Message */}
        {submitted && (
          <div className="success-box">
            <div className="success-icon">✓</div>

            <div>
              <h2>Profile Created Successfully!</h2>

              <p>
                All required information has passed client-side
                validation.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>

            {/* Personal Information */}
            <section className="section">
              <div className="section-heading">
                <span>1</span>
                <h2>Personal Information</h2>
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name <span>*</span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={
                    errors.fullName ? "invalid" : ""
                  }
                />

                {errors.fullName && (
                  <small className="error">
                    {errors.fullName}
                  </small>
                )}
              </div>

              <div className="two-columns">

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={
                      errors.email ? "invalid" : ""
                    }
                  />

                  {errors.email && (
                    <small className="error">
                      {errors.email}
                    </small>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span>*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={
                      errors.phone ? "invalid" : ""
                    }
                  />

                  {errors.phone && (
                    <small className="error">
                      {errors.phone}
                    </small>
                  )}
                </div>

              </div>
            </section>

            {/* Education */}
            <section className="section">
              <div className="section-heading">
                <span>2</span>
                <h2>Education & Skills</h2>
              </div>

              {/* Qualification */}
              <div className="form-group">
                <label htmlFor="qualification">
                  Educational Qualification <span>*</span>
                </label>

                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className={
                    errors.qualification ? "invalid" : ""
                  }
                >
                  <option value="">
                    -- Select Qualification --
                  </option>

                  {qualifications.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.qualification && (
                  <small className="error">
                    {errors.qualification}
                  </small>
                )}
              </div>

              {/* Skills */}
              <div className="form-group">
                <label htmlFor="skills">
                  Skills <span>*</span>
                </label>

                <input
                  id="skills"
                  name="skills"
                  type="text"
                  placeholder="e.g. React, JavaScript, HTML, CSS"
                  value={formData.skills}
                  onChange={handleChange}
                  className={
                    errors.skills ? "invalid" : ""
                  }
                />

                <p className="hint">
                  Separate multiple skills using commas.
                </p>

                {errors.skills && (
                  <small className="error">
                    {errors.skills}
                  </small>
                )}
              </div>

              {/* Experience */}
              <div className="form-group">
                <label htmlFor="experience">
                  Years of Experience <span>*</span>
                </label>

                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  placeholder="e.g. 2"
                  value={formData.experience}
                  onChange={handleChange}
                  className={
                    errors.experience ? "invalid" : ""
                  }
                />

                {errors.experience && (
                  <small className="error">
                    {errors.experience}
                  </small>
                )}
              </div>
            </section>

            {/* Resume */}
            <section className="section">
              <div className="section-heading">
                <span>3</span>
                <h2>Resume & Salary</h2>
              </div>

              {/* Resume Upload */}
              <div className="form-group">
                <label htmlFor="resume">
                  Resume <span>*</span>
                </label>

                <div
                  className={`file-box ${
                    errors.resume ? "file-error" : ""
                  }`}
                >
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />

                  <div className="file-info">
                    <span className="upload-icon">
                      📄
                    </span>

                    <div>
                      <strong>
                        {getFileName()}
                      </strong>

                      <p>
                        PDF, DOC or DOCX • Maximum 5 MB
                      </p>
                    </div>
                  </div>
                </div>

                {errors.resume && (
                  <small className="error">
                    {errors.resume}
                  </small>
                )}
              </div>

              {/* Salary */}
              <div className="form-group">
                <label htmlFor="expectedSalary">
                  Expected Annual Salary (₹) <span>*</span>
                </label>

                <input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="number"
                  min="1"
                  placeholder="e.g. 500000"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className={
                    errors.expectedSalary
                      ? "invalid"
                      : ""
                  }
                />

                {errors.expectedSalary && (
                  <small className="error">
                    {errors.expectedSalary}
                  </small>
                )}
              </div>
            </section>

            {/* Cover Letter */}
            <section className="section">
              <div className="section-heading">
                <span>4</span>
                <h2>Cover Letter</h2>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">
                  Cover Letter <span>*</span>
                </label>

                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="7"
                  maxLength="1000"
                  placeholder="Write a short cover letter explaining why you are suitable for this position..."
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className={
                    errors.coverLetter ? "invalid" : ""
                  }
                ></textarea>

                <div className="character-count">
                  {formData.coverLetter.length} / 1000
                </div>

                {errors.coverLetter && (
                  <small className="error">
                    {errors.coverLetter}
                  </small>
                )}
              </div>
            </section>

            {/* Buttons */}
            <div className="button-row">
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="submit-btn"
              >
                Create Profile
              </button>
            </div>

            <p className="required-text">
              * All fields are required
            </p>
          </form>
        ) : (
          /* Profile Preview */
          <section className="profile-preview">

            <div className="preview-header">
              <div className="avatar">
                {formData.fullName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{formData.fullName}</h2>

                <p>
                  {formData.qualification}
                </p>
              </div>
            </div>

            <div className="preview-section">
              <h3>Contact Information</h3>

              <div className="preview-grid">
                <div>
                  <span>Email</span>
                  <strong>{formData.email}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{formData.phone}</strong>
                </div>
              </div>
            </div>

            <div className="preview-section">
              <h3>Professional Information</h3>

              <div className="preview-grid">
                <div>
                  <span>Qualification</span>
                  <strong>
                    {formData.qualification}
                  </strong>
                </div>

                <div>
                  <span>Experience</span>
                  <strong>
                    {formData.experience} years
                  </strong>
                </div>

                <div>
                  <span>Expected Salary</span>
                  <strong>
                    ₹
                    {Number(
                      formData.expectedSalary
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Resume</span>
                  <strong>
                    {formData.resume?.name}
                  </strong>
                </div>
              </div>
            </div>

            <div className="preview-section">
              <h3>Skills</h3>

              <div className="skills">
                {formData.skills
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean)
                  .map((skill, index) => (
                    <span
                      className="skill-tag"
                      key={`${skill}-${index}`}
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <div className="preview-section">
              <h3>Cover Letter</h3>

              <p className="cover-preview">
                {formData.coverLetter}
              </p>
            </div>

            <div className="preview-actions">
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Edit Profile
              </button>
            </div>
          </section>
        )}

        <footer>
          <p>
            Online Job Application & Profile Builder
          </p>

          <span>
            ReactJS • Client-Side Validation • Profile Preview
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
