// components/CreateCHO.js
import React, { useState } from 'react';
import styles from './CreateCHO.module.css'; // Import your styles
import createCHOApi from './createCHOApi';

const CreateCHOModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const [submitText, setsubmitText] = useState("Submit");
  const [CreateCHOLoading, setCreateCHOLoading] = useState(false);
  const [CreateCHOAdded, setCreateCHOAdded] = useState();
  const [apiCompleted, setApiCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const CreateCHOLoaded = () => {

    setFormData({
      name: '',
      phone: '',
      password: '',
      password_confirmation: '',
    });
    setCreateCHOLoading(false);
    setsubmitText("Submit");
    setCreateCHOAdded("Data Added Successfully!");
    setApiCompleted(true);
  };

  const dataReset = () => {
    setFormData({
      name: '',
      phone: '',
      password: '',
      password_confirmation: '',
    });
    setCreateCHOLoading(false);
    setsubmitText("Submit");


  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.password_confirmation) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    // Check if password length is more than 7
    if (formData.password.length <= 7) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    setCreateCHOLoading(true);
    setsubmitText("Processing...");
    createCHOApi(formData, CreateCHOLoaded, dataReset);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <h2>Create CHO</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Name:</label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Phone:</label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">Password:</label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password_confirmation">Confirm Password:</label>
                <input
                  className={styles.input}
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
              <button disabled={CreateCHOLoading} style={{ backgroundColor: '#009396'}} type="submit" className={styles.submitButton}>
                {submitText}
              </button>

              {apiCompleted && <p className={styles.successMessage}>{CreateCHOAdded}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCHOModal;
