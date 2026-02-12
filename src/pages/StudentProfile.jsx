import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    fatherName: user?.fatherName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    education: user?.education || '',
    section: user?.section || '',
    skills: user?.skills || [],
    newSkill: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill.trim()],
        newSkill: '',
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.fatherName ||
      !formData.phone ||
      !formData.email ||
      !formData.education ||
      !formData.section ||
      formData.skills.length === 0
    ) {
      alert('Please fill all fields and add at least one skill');
      return;
    }

    // Update user profile
    updateUserProfile({
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      education: formData.education,
      section: formData.section,
      skills: formData.skills,
      profileComplete: true,
    });

    setSubmitted(true);
    alert('Profile saved successfully!');
    
    // Redirect to skill-based companies
    setTimeout(() => {
      navigate('/skill-based-companies');
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="profile-header">
        <h1 style={{color:"#fff"}}>📋 Complete Your Student Profile</h1>
        <p>Fill in your details to find matching companies</p>
      </div>

      <form onSubmit={handleSubmit} className="student-profile-form">
        {/* Personal Information */}
        <div className="form-section">
          <h2>Personal Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Enter your father's name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+92-300-XXXXXXX"
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Karachi, Lahore"
                required
              />
            </div>
          </div>
        </div>

        {/* Education Information */}
        <div className="form-section">
          <h2>Education Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Education Level *</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Education Level</option>
                <option value="Matric">Matric</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <div className="form-group">
              <label>Section/Field *</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Engineering"
                required
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="form-section">
          <h2>Your Skills *</h2>
          <p className="section-description">Add your technical and professional skills</p>

          <div className="skill-input-group">
            <input
              type="text"
              value={formData.newSkill}
              onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g., React, JavaScript, Python, UI/UX Design"
            />
            <button type="button" onClick={handleAddSkill} className="btn btn-secondary">
              Add Skill
            </button>
          </div>

          {formData.skills.length > 0 && (
            <div className="skills-display">
              <h4>Added Skills ({formData.skills.length})</h4>
              <div className="skills-list">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="remove-skill"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-large">
          Save Profile & Find Companies
        </button>
      </form>

      {submitted && (
        <div className="success-message">
          ✓ Profile saved! Redirecting to matching companies...
        </div>
      )}
    </div>
  );
};

export default StudentProfile;