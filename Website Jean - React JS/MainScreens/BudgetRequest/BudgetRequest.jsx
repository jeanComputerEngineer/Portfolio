import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BudgetRequest.module.css';
import { useTheme } from '../../Utils/ThemeContext';
import axios from 'axios';
import ComoFunciona from '../../Images/Quote/HowProcessWorksLight.png';
import ComoFuncionaDark from '../../Images/Quote/HowProcessWorksDark.png';

function BudgetRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prospectFullName: '',
    prospectEmail: '',
    prospectPhone: '',
    serviceType: '',
  });

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  };

  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === '') {
        return alert(`No field can be empty!`);
      }
    }

    if (formData.prospectFullName.length > 50) {
      return alert('Name must have at most 50 characters!');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.prospectEmail)) {
      return alert('Please enter a valid email!');
    }

    const telefoneRegex = /^[0-9]+$/;
    if (!telefoneRegex.test(formData.prospectPhone)) {
      return alert('Phone number cannot contain letters!');
    }

    openConfirmation();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openConfirmation = () => {
    setConfirmation(true);
  };

  const closeConfirmation = () => {
    setConfirmation(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://app.jeanhenrique.site/cadastro', formData, config);

      setFormData({
        prospectFullName: '',
        prospectEmail: '',
        prospectPhone: '',
        serviceType: '',
      });

      alert('Sent successfully! I will contact you soon!');
      navigate('/');
    } catch (error) {
      console.error('Error sending data:', error);
      alert('An error occurred while sending the data. Please try again.');
    }
  };

  return (
    <div className={theme}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Request a Quote</h1>
          <form onSubmit={handleSubmit}>
            <h2>Full Name:</h2>
            <input
              type="text"
              id="prospectFullName"
              name="prospectFullName"
              value={formData.prospectFullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <h2 htmlFor="email">Email:</h2>
            <input
              type="email"
              id="prospectEmail"
              name="prospectEmail"
              value={formData.prospectEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <h2 htmlFor="telefone">Phone:</h2>
            <input
              type="tel"
              id="prospectPhone"
              name="prospectPhone"
              value={formData.prospectPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            <h2>Service Type:</h2>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select the service type
              </option>
              <option value="websiteCreation">Website Creation</option>
              <option value="mobileAppDevelopment">Mobile App Development</option>
              <option value="desktopAppDevelopment">Desktop Application Development</option>
              <option value="computerTechSupport">Computer Technical Support</option>
              <option value="imageEditing">Image Editing</option>
              <option value="videoCreation">Video Creation</option>
              <option value="gameDevelopment">Game Development</option>
              <option value="jobProposal">Permanent Job Offer CLT/PJ</option>
            </select>

            <p>
              By requesting a quote, you agree with the{' '}
              <button
                className={styles.termsButton}
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                Privacy Policy and Terms of Use.
              </button>
            </p>
            {showModal && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <button className={styles.close} onClick={closeModal}>
                    &times;
                  </button>
                  <div className={styles.containerExtra}>
                    <h2>Terms of Use</h2>
                    <p>Welcome to the website of Jean Samuel Candido Henrique.</p>
                    <p>
                      By accessing our site and using our services, you agree to these terms of use.
                      If you do not agree with any of these terms, please do not continue using our
                      site.
                    </p>
                    <p>
                      <strong>Personal Information:</strong> By using our site and providing
                      personal information such as full name, phone number, and email to request
                      quotes, you agree with our privacy policy.
                    </p>
                    <p>
                      <strong>Responsible Use:</strong> You agree to use our site responsibly and in
                      accordance with all applicable laws and regulations.
                    </p>
                    <p>
                      <strong>Intellectual Property:</strong> The content on our site, including
                      development code, text, logos, and designs, is the exclusive property of Jean
                      Samuel Candido Henrique.
                    </p>
                    <p>
                      <strong>Third-Party Links:</strong> Our site may contain links to third-party
                      sites. We are not responsible for the content or privacy practices of those
                      sites.
                    </p>
                    <p>
                      <strong>Changes to Terms:</strong> We reserve the right to change these terms
                      of use at any time without prior notice. It is your responsibility to review
                      these terms periodically to stay informed about any changes.
                    </p>
                    <p>
                      <strong>Contact:</strong> If you have any questions or concerns about these
                      terms of use, please contact us.
                    </p>

                    <h2>Privacy Policy</h2>
                    <p>
                      Your privacy is important to us. This privacy policy describes how we collect,
                      use, and protect the personal information you provide when using our site.
                    </p>
                    <p>
                      <strong>Information Collected:</strong> We may collect personal information
                      such as full name, phone number, and email when you fill out a contact or
                      appointment form on our site.
                    </p>
                    <p>
                      <strong>Use of Information:</strong> We use the information we collect to
                      schedule appointments, discuss service pricing, answer your questions, and
                      provide additional information about our services. We will not share your
                      personal information with third parties without your consent, except when
                      necessary to provide the services you requested.
                    </p>
                    <p>
                      <strong>Security:</strong> We implement security measures to protect your
                      personal information from unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                    <p>
                      <strong>Changes to the Privacy Policy:</strong> We reserve the right to make
                      changes to this privacy policy at any time by publishing an updated version on
                      our site. We recommend that you review this policy periodically to stay aware
                      of any changes.
                    </p>
                    <p>
                      <strong>Deletion:</strong> If you wish to delete the information provided in
                      this form, please contact us using the contact methods provided on our site.
                    </p>
                    <p>
                      <strong>Contact:</strong> If you have any questions or concerns about our
                      privacy policy, please contact us.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button className={styles.button} type="submit">
              Submit
            </button>
            {confirmation && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalConfirmation}>
                  <div className={styles.modalHeader}>
                    <br />
                    <button className={styles.modalClose} onClick={closeConfirmation}>
                      X
                    </button>
                  </div>
                  <div className={styles.modalBody}>
                    <p>Are you sure the entered data is correct?</p>
                  </div>
                  <div className={styles.modalFooter}>
                    <button onClick={closeConfirmation} className={styles.modalCancel}>
                      Cancel
                    </button>
                    <button type="submit" onClick={submitForm} className={styles.modalConfirm}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className={styles.sideImage}>
          {isDarkMode ? (
            <img src={ComoFuncionaDark} alt="side image" />
          ) : (
            <img src={ComoFunciona} alt="side image" />
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetRequest;
