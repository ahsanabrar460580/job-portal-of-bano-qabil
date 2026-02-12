import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const CompanyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: user?.companyName || '',
    registrationNumber: user?.registrationNumber || '',
    industry: user?.industry || '',
    website: user?.website || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    description: user?.description || '',
    employees: user?.employees || '',
    logo: user?.logo || '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.companyName ||
      !formData.registrationNumber ||
      !formData.industry ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.description
    ) {
      alert('Please fill all required fields');
      return;
    }

    // Update user profile
    updateUserProfile({
      companyName: formData.companyName,
      registrationNumber: formData.registrationNumber,
      industry: formData.industry,
      website: formData.website,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      description: formData.description,
      employees: formData.employees,
      logo: formData.logo,
      profileComplete: true,
    });

    setSubmitted(true);
    alert('Company profile saved successfully!');

    // Redirect to company dashboard
    setTimeout(() => {
      navigate('/company-dashboard');
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="profile-header">
        <h1 style={{color:"#fff"}}>🏢 Complete Your Company Profile</h1><br />
        <p>Fill in your company details to start hiring</p>
      </div>

      <form onSubmit={handleSubmit} className="company-profile-form">
        {/* Company Information */}
        <div className="form-section">
          <h2>Company Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                required
              />
            </div>
            <div className="form-group">
              <label>Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="e.g., PRA-123456"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Telecom">Telecom</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Employees *</label>
              <select
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h2>Contact Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="company@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+92-21-XXXXX"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
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

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h2>Additional Information</h2>

          <div className="form-group">
            <label>Company Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your company, what you do, your mission, etc."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Company Logo URL</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-large">
          Save Company Profile
        </button>
      </form>

      {submitted && (
        <div className="success-message">
          ✓ Company profile saved! Redirecting...
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;