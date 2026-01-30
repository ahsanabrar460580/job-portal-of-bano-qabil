import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Pages.css";

// Mock Companies Database (moved to module scope to fix ESLint warnings)
const companiesDatabase = [
  {
    id: 1,
    name: "TechCorp Pakistan",
    registrationNumber: "PRA-123456",
    logo: "🏢",
    industry: "Technology",
    website: "www.techcorp.pk",
    email: "hr@techcorp.pk",
    phone: "+92-21-35678900",
    city: "Karachi",
    address: "Blue Area, Karachi",
    employees: "101-500",
    description:
      "Leading technology company in Pakistan providing innovative solutions in web and mobile development.",
    about:
      "TechCorp Pakistan is a pioneer in digital transformation with over 15 years of experience. We work with Fortune 500 companies and startups alike.",
    vision: "To be the most trusted technology partner in Pakistan.",
    mission: "Delivering excellence through innovative technology solutions.",
    openPositions: [
      {
        id: 1,
        title: "Frontend Developer",
        salary: "40,000-60,000",
        type: "Internship",
      },
      {
        id: 2,
        title: "Backend Developer",
        salary: "50,000-70,000",
        type: "Full-time",
      },
      {
        id: 3,
        title: "UI/UX Designer",
        salary: "35,000-55,000",
        type: "Internship",
      },
    ],
    requiredSkills: ["React", "JavaScript", "Node.js", "MongoDB"],
    benefits: [
      "🏥 Health Insurance",
      "💰 Competitive Salary",
      "🎓 Learning & Development",
      "🏖️ Paid Leave",
      "🚗 Transportation",
    ],
    reviews: 4.5,
    applicants: 150,
  },
  {
    id: 2,
    name: "Digital Solutions",
    registrationNumber: "PRA-789012",
    logo: "💻",
    industry: "Technology",
    website: "www.digitalsolutions.pk",
    email: "hr@digitalsolutions.pk",
    phone: "+92-42-12345678",
    city: "Lahore",
    address: "DHA Phase 5, Lahore",
    employees: "11-50",
    description:
      "Innovative digital agency focused on web design and development.",
    about:
      "Digital Solutions specializes in creating beautiful and functional digital products for businesses of all sizes.",
    vision: "Empowering businesses through digital innovation.",
    mission: "Creating digital solutions that matter.",
    openPositions: [
      {
        id: 1,
        title: "Junior Developer",
        salary: "30,000-40,000",
        type: "Internship",
      },
      {
        id: 2,
        title: "Web Designer",
        salary: "35,000-50,000",
        type: "Full-time",
      },
    ],
    requiredSkills: ["React", "CSS", "JavaScript", "Figma"],
    benefits: [
      "🌟 Flexible Hours",
      "💰 Competitive Salary",
      "🎓 Training Programs",
      "☕ Free Lunch",
    ],
    reviews: 4.8,
    applicants: 80,
  },
  {
    id: 3,
    name: "StartUp Hub",
    registrationNumber: "PRA-345678",
    logo: "🚀",
    industry: "Technology",
    website: "www.startuphub.pk",
    email: "hr@startuphub.pk",
    phone: "+92-51-91234567",
    city: "Islamabad",
    address: "F-7, Islamabad",
    employees: "1-10",
    description: "Young and dynamic startup building next-gen products.",
    about:
      "StartUp Hub is a fast-growing tech startup focused on AI and machine learning solutions.",
    vision: "Revolutionizing industries with AI.",
    mission: "Building intelligent solutions for the future.",
    openPositions: [
      {
        id: 1,
        title: "Python Developer",
        salary: "50,000-70,000",
        type: "Full-time",
      },
      {
        id: 2,
        title: "Data Scientist",
        salary: "60,000-80,000",
        type: "Full-time",
      },
    ],
    requiredSkills: ["Python", "Machine Learning", "SQL"],
    benefits: [
      "📈 Equity/Stock Options",
      "💰 High Salary",
      "🎓 Growth Opportunities",
      "🎯 Challenging Work",
    ],
    reviews: 4.3,
    applicants: 120,
  },
];

const StudentCompanyDetail = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const foundCompany = companiesDatabase.find(
      (c) => c.id === parseInt(companyId),
    );
    setCompany(foundCompany);
    setLoading(false);
  }, [companyId]);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setApplied(true);
    alert(`Applied successfully to ${company.name}!`);

    // Save application to context or backend
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="page-container">
        <p className="loading-text">Loading company details...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="page-container">
        <p>Company not found</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Company Header */}
      <div className="company-detail-header">
        <div className="company-hero">
          <div className="company-logo-large">{company.logo}</div>
          <div className="company-title-section">
            <h1>{company.name}</h1>
            <p className="company-industry">{company.industry}</p>
            <div className="company-meta">
              <span className="meta-item">⭐ {company.reviews}/5</span>
              <span className="meta-item">
                👥 {company.applicants} Applicants
              </span>
              <span className="meta-item">
                👨‍💼 {company.employees} Employees
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="company-quick-info">
        <div className="info-item">
          <span className="info-icon">📍</span>
          <div>
            <p className="info-label">Location</p>
            <p className="info-value">
              {company.address}, {company.city}
            </p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🌐</span>
          <div>
            <p className="info-label">Website</p>
            <p className="info-value">
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            </p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📧</span>
          <div>
            <p className="info-label">Email</p>
            <p className="info-value">{company.email}</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📞</span>
          <div>
            <p className="info-label">Phone</p>
            <p className="info-value">{company.phone}</p>
          </div>
        </div>
      </div>

      <div className="company-detail-content">
        {/* Left Column */}
        <div className="company-detail-left">
          {/* About Section */}
          <div className="detail-section">
            <h2>About Company</h2>
            <p>{company.description}</p>
            <p>{company.about}</p>
          </div>

          {/* Vision & Mission */}
          <div className="detail-section">
            <h3>Vision & Mission</h3>
            <div className="vision-mission">
              <div className="vm-item">
                <h4>Vision</h4>
                <p>{company.vision}</p>
              </div>
              <div className="vm-item">
                <h4>Mission</h4>
                <p>{company.mission}</p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="detail-section">
            <h2>Open Positions</h2>
            <div className="positions-list">
              {company.openPositions.map((position) => (
                <div key={position.id} className="position-card">
                  <div className="position-header">
                    <h4>{position.title}</h4>
                    <span className="position-type">{position.type}</span>
                  </div>
                  <p className="position-salary">💰 {position.salary}/month</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div className="detail-section">
            <h2>Required Skills</h2>
            <div className="skills-grid">
              {company.requiredSkills.map((skill, idx) => (
                <span key={idx} className="skill-badge-large">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="company-detail-right">
          {/* Apply Button */}
          <div className="apply-card">
            <h3>Ready to Apply?</h3>
            <p>Join {company.name} and grow your career</p>
            <button
              onClick={handleApply}
              className={`btn ${applied ? "btn-success" : "btn-primary"} btn-large`}
              disabled={applied}
            >
              {applied ? "✓ Applied Successfully" : "📝 Apply Now"}
            </button>
            {applied && (
              <p className="success-text">Redirecting to your dashboard...</p>
            )}
          </div>

          {/* Benefits */}
          <div className="benefits-card">
            <h3>Benefits</h3>
            <ul className="benefits-list">
              {company.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="info-card">
            <h3>Company Info</h3>
            <div className="info-detail">
              <p>
                <strong>Registration:</strong> {company.registrationNumber}
              </p>
              <p>
                <strong>Industry:</strong> {company.industry}
              </p>
              <p>
                <strong>Size:</strong> {company.employees} employees
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {company.reviews}/5
              </p>
            </div>
          </div>

          {/* Share */}
          <div className="share-card">
            <h3>Share</h3>
            <div className="share-buttons">
              <button className="share-btn">📱 Facebook</button>
              <button className="share-btn">𝕏 Twitter</button>
              <button className="share-btn">💼 LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCompanyDetail;
