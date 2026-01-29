import React, { useState } from 'react';
import { usersAPI } from '../services/api';
import './Pages.css';

const CVBuilder = () => {
  const [cvData, setCvData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleAddExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { company: '', position: '', duration: '' }],
    });
  };

  const handleAddEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { school: '', degree: '', year: '' }],
    });
  };

  const handleSaveCV = async () => {
    try {
      // Mock save - replace with API call
      alert('CV saved successfully!');
      console.log('CV Data:', cvData);
    } catch (err) {
      console.error('Failed to save CV', err);
    }
  };

  return (
    <div className="page-container">
      <h1>Build Your CV</h1>
      
      <div className="form-container">
        <section className="cv-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={cvData.fullName}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={cvData.email}
              onChange={handleInputChange}
              placeholder="Your email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={cvData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
          </div>
          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              name="summary"
              value={cvData.summary}
              onChange={handleInputChange}
              placeholder="Write a brief professional summary"
              rows="4"
            />
          </div>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <input type="text" placeholder="Company" />
              <input type="text" placeholder="Position" />
              <input type="text" placeholder="Duration" />
            </div>
          ))}
          <button onClick={handleAddExperience} className="btn btn-secondary">
            + Add Experience
          </button>
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <input type="text" placeholder="School/University" />
              <input type="text" placeholder="Degree" />
              <input type="text" placeholder="Year" />
            </div>
          ))}
          <button onClick={handleAddEducation} className="btn btn-secondary">
            + Add Education
          </button>
        </section>

        <button onClick={handleSaveCV} className="btn btn-primary btn-large">
          Save CV
        </button>
      </div>
    </div>
  );
};

export default CVBuilder;