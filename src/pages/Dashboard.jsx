import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

// Mock applications data (moved to module scope to fix ESLint warnings)
const mockApplications = [
  {
    id: 1,
    companyName: "Tech Corp",
    position: "Frontend Developer",
    appliedDate: "2026-01-25",
    status: "pending",
    logo: "🏢",
    salary: "Rs. 100,000 - 150,000",
  },
  {
    id: 2,
    companyName: "StartUp Inc",
    position: "Full Stack Developer",
    appliedDate: "2026-01-20",
    status: "accepted",
    logo: "🚀",
    salary: "Rs. 80,000 - 120,000",
  },
  {
    id: 3,
    companyName: "Cloud Systems",
    position: "Backend Developer",
    appliedDate: "2026-01-15",
    status: "rejected",
    logo: "☁️",
    salary: "Rs. 120,000 - 180,000",
  },
  {
    id: 4,
    companyName: "Mobile Innovations",
    position: "React Native Developer",
    appliedDate: "2026-01-10",
    status: "pending",
    logo: "📱",
    salary: "Rs. 90,000 - 140,000",
  },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({});

  // Mock student profile data - memoized since it depends on user
  const mockProfile = useMemo(
    () => ({
      fullName: user?.name || "Student Name",
      email: user?.email || "student@email.com",
      phone: "+92-300-1234567",
      location: "Karachi, Pakistan",
      headline: "Aspiring Full Stack Developer",
      bio: "Passionate about building web applications and learning new technologies.",
      profileCompletion: 85,
      skills: user?.skill || ["React", "JavaScript", "Node.js", "MongoDB", "CSS", "HTML"],
      education: [
        {
          school: "National Institute of Technology",
          degree: "B.Tech Computer Science",
          year: "2023",
          cgpa: "8.2",
        },
      ],
      experience: [
        {
          company: "Tech Solutions Inc",
          position: "Junior Frontend Developer",
          duration: "Jan 2024 - Present",
          description: "Building React applications",
        },
      ],
    }),
    [user],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(mockProfile);
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [mockProfile]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: "⏳", text: "Pending", class: "status-pending" },
      accepted: { icon: "✅", text: "Accepted", class: "status-accepted" },
      rejected: { icon: "❌", text: "Rejected", class: "status-rejected" },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`status-badge ${badge.class}`}>
        {badge.icon} {badge.text}
      </span>
    );
  };

  const pendingCount = applications.filter(
    (a) => a.status === "pending",
  ).length;
  const acceptedCount = applications.filter(
    (a) => a.status === "accepted",
  ).length;

  return (
    <div className="student-dashboard">
      {loading && (
        <div className="loading-overlay">
          <div className="loader-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="header-title" style={{color:"#fff"}}>
                <span className="greeting-icon">👋</span>
                Welcome Back, {profile.fullName?.split(" ")[0]}!
              </h1>
              <p className="header-subtitle">Your career journey starts here</p>
            </div>
            <div className="header-actions">
              <button
                className="btn-edit-profile"
                onClick={() => navigate("/student-profile")}
              >
                ✏️ Edit Profile
              </button>
              <button
                className="btn-find-jobs"
                onClick={() => navigate("/skill-based-companies")}
              >
                🔍 Find Companies
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card profile-stat">
              <div className="stat-icon">👤</div>
              <div className="stat-content">
                <h3 className="stat-label">Profile Completion</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${profile.profileCompletion}%` }}
                  ></div>
                </div>
                <p className="stat-value">{profile.profileCompletion}%</p>
              </div>
            </div>

            <div className="stat-card applications-stat">
              <div className="stat-icon">📨</div>
              <div className="stat-content">
                <h3 className="stat-label">Total Applications</h3>
                <p className="stat-value">{applications.length}</p>
                <p className="stat-subtext">Sent applications</p>
              </div>
            </div>

            <div className="stat-card pending-stat">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3 className="stat-label">Pending</h3>
                <p className="stat-value">{pendingCount}</p>
                <p className="stat-subtext">Awaiting response</p>
              </div>
            </div>

            <div className="stat-card accepted-stat">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3 className="stat-label">Accepted</h3>
                <p className="stat-value">{acceptedCount}</p>
                <p className="stat-subtext">Great news!</p>
              </div>
            </div>
          </div>

          <div className="tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <span className="tab-icon">📊</span>
                Overview
              </button>
              <button
                className={`tab-button ${activeTab === "applications" ? "active" : ""}`}
                onClick={() => setActiveTab("applications")}
              >
                <span className="tab-icon">📋</span>
                Applications
              </button>
              <button
                className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className="tab-icon">👤</span>
                Profile
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="tab-content overview-tab">
                <div className="overview-grid">
                  <div className="info-card profile-card">
                    <div className="card-header">
                      <h3 className="card-title" style={{color:"#fff"}}>📌 Profile Summary</h3>
                    </div>
                    <div className="card-body">
                      <div className="profile-info-row">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{profile.fullName}</span>
                      </div>
                      <div className="profile-info-row">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="profile-info-row">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                      <div className="profile-info-row">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{profile.location}</span>
                      </div>
                      <div className="profile-info-row">
                        <span className="info-label">Headline:</span>
                        <span className="info-value">{profile.headline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card skills-card">
                    <div className="card-header">
                      <h3 className="card-title" style={{color:"#fff"}}>⚡ Your Skills</h3>
                    </div>
                    <div className="card-body skills-body">
                      <div className="skills-list">
                        {profile.skills?.map((skill, idx) => (
                          <span key={idx} className="skill-badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                    </div>
                  </div>

                  <div className="info-card education-card">
                    <div className="card-header">
                      <h3 className="card-title" style={{color:"#fff"}}>🎓 Education</h3>
                    </div>
                    <div className="card-body">
                      {profile.education?.map((edu, idx) => (
                        <div key={idx} className="education-item">
                          <h4 className="edu-school">{edu.school}</h4>
                          <p className="edu-degree">{edu.degree}</p>
                          <p className="edu-meta">
                            {edu.year} • CGPA: {edu.cgpa}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info-card experience-card">
                    <div className="card-header">
                      <h3 className="card-title" style={{color:"#fff"}}>💼 Experience</h3>
                    </div>
                    <div className="card-body">
                      {profile.experience?.map((exp, idx) => (
                        <div key={idx} className="experience-item">
                          <h4 className="exp-company">{exp.company}</h4>
                          <p className="exp-position">{exp.position}</p>
                          <p className="exp-duration">{exp.duration}</p>
                          <p className="exp-description">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="tab-content applications-tab">
                <div className="applications-list">
                  {applications.length > 0 ? (
                    applications.map((app, idx) => (
                      <div
                        key={app.id}
                        className="application-item"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="app-left">
                          <div className="app-logo">{app.logo}</div>
                          <div className="app-info">
                            <h3 className="app-company">{app.companyName}</h3>
                            <p className="app-position">{app.position}</p>
                            <p className="app-date">
                              Applied:{" "}
                              {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="app-center">
                          <p className="app-salary">{app.salary}</p>
                        </div>
                        <div className="app-right">
                          {getStatusBadge(app.status)}
                          <button className="btn-view-app">View →</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-applications">
                      <span className="no-app-icon">📭</span>
                      <h3>No Applications Yet</h3>
                      <p>
                        Start applying to companies to see your applications
                        here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="tab-content profile-tab">
                <div className="profile-content">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      {profile.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-header-info">
                      <h2>{profile.fullName}</h2>
                      <p className="profile-headline">{profile.headline}</p>
                      <p className="profile-location">📍 {profile.location}</p>
                    </div>
                  </div>

                  <div className="profile-bio">
                    <h3>About</h3>
                    <p>{profile.bio}</p>
                  </div>

                  <div className="profile-section">
                    <h3>Skills ({profile.skills?.length || 0})</h3>
                    <div className="skills-grid">
                      {profile.skills?.map((skill, idx) => (
                        <div key={idx} className="skill-item">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3>Education</h3>
                    {profile.education?.map((edu, idx) => (
                      <div key={idx} className="profile-timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <h4>{edu.degree}</h4>
                          <p className="timeline-org">{edu.school}</p>
                          <p className="timeline-date">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="profile-actions">
                    <button className="btn-edit-full">Edit Full Profile</button>
                    <button className="btn-download-cv">⬇️ Download CV</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
