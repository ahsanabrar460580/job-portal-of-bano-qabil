import React, { useState, useEffect } from "react";
import "./CompanyDashboard.css";

// Mock Database - Applications with Student CVs (moved to module scope to fix ESLint warnings)
const mockApplications = [
  {
    id: 1,
    studentId: 101,
    studentName: "Ahsan Abrar",
    email: "ahsanabrar460580@email.com",
    phone: "+92-3001234567",
    appliedDate: "2026-01-25",
    status: "pending",
    position: "Frontend Developer",
    score: 8.5,
    cv: {
      fullName: "Ahsan Abrar",
      email: "ahsanabrar460580@email.com",
      phone: "+92-3001234567",
      location: "Karachi, Pakistan",
      summary:
        "Passionate frontend developer with 2 years of experience in building responsive web applications.",
      experience: [
        {
          company: "Tech Solutions Inc",
          position: "Junior Frontend Developer",
          duration: "Jan 2024 - Present",
          description:
            "Working on React applications and responsive UI design",
        },
      ],
      education: [
        {
          school: "National Institute of Technology",
          degree: "B.Tech Computer Science",
          year: "2023",
          cgpa: "8.2",
        },
      ],
      skills: ["React", "JavaScript", "CSS", "HTML", "Responsive Design"],
      certifications: ["React Certification from Udemy"],
      portfolio: "https://404notfound.netlify.app/",
    },
  },
  {
    id: 2,
    studentId: 102,
    studentName: "Danish Khan",
    email: "danish.khan@email.com",
    phone: "+92-3001234568",
    appliedDate: "2026-01-24",
    status: "accepted",
    position: "Frontend Developer",
    score: 9.2,
    cv: {
      fullName: "Danish Khan",
      email: "danish.khan@email.com",
      phone: "+92-3001234568",
      location: "Lahore, Pakistan",
      summary:
        "Full stack developer with expertise in modern web technologies.",
      experience: [
        {
          company: "Digital Innovation Labs",
          position: "Frontend Developer",
          duration: "Mar 2024 - Present",
          description: "Developing React applications with TypeScript",
        },
      ],
      education: [
        {
          school: "University of Engineering and Technology",
          degree: "B.Tech Information Technology",
          year: "2023",
          cgpa: "8.5",
        },
      ],
      skills: ["React", "TypeScript", "Node.js", "MongoDB", "CSS", "Git"],
      certifications: ["Full Stack Certification"],
    },
  },
  {
    id: 3,
    studentId: 103,
    studentName: "Fatima Hassan",
    email: "fatima.hassan@email.com",
    phone: "+92-3001234569",
    appliedDate: "2026-01-23",
    status: "rejected",
    position: "UI/UX Designer",
    score: 7.8,
    cv: {
      fullName: "Fatima Hassan",
      email: "fatima.hassan@email.com",
      phone: "+92-3001234569",
      location: "Islamabad, Pakistan",
      summary: "Creative UI/UX designer passionate about user experience.",
      experience: [],
      education: [
        {
          school: "National University of Sciences & Technology",
          degree: "BS Graphic Design",
          year: "2023",
          cgpa: "8.0",
        },
      ],
      skills: [
        "Figma",
        "Adobe XD",
        "UI Design",
        "UX Research",
        "Prototyping",
      ],
      certifications: ["Google UX Design Certificate"],
    },
  },
  {
    id: 4,
    studentId: 104,
    studentName: "Ali Raza",
    email: "ali.raza@email.com",
    phone: "+92-3001234570",
    appliedDate: "2026-01-22",
    status: "pending",
    position: "Backend Developer",
    score: 8.9,
    cv: {
      fullName: "Ali Raza",
      email: "ali.raza@email.com",
      phone: "+92-3001234570",
      location: "Multan, Pakistan",
      summary: "Backend developer with expertise in Node.js and databases.",
      experience: [
        {
          company: "Cloud Services Ltd",
          position: "Backend Developer",
          duration: "Jul 2024 - Present",
          description: "Building scalable APIs and database solutions",
        },
      ],
      education: [
        {
          school: "Muhammad Ali Jinnah University",
          degree: "B.S Computer Science",
          year: "2023",
          cgpa: "8.7",
        },
      ],
      skills: ["Node.js", "MongoDB", "PostgreSQL", "Express", "REST APIs"],
      certifications: ["Node.js Advanced Concepts"],
    },
  },
];

  const CompanyDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [selectedCV, setSelectedCV] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchStudent, setSearchStudent] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setApplications(mockApplications);
        setLoading(false);
      }, 800);
    }, []);

  // Filter and search applications
  const filteredApplications = applications
    .filter((app) => {
      const matchesStatus =
        filterStatus === "all" || app.status === filterStatus;
      const matchesSearch =
        app.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
        app.email.toLowerCase().includes(searchStudent.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === "score") return b.score - a.score;
      return 0;
    });

  const getStatusBadge = (status) => {
    const statusClass = {
      pending: "status-pending",
      accepted: "status-accepted",
      rejected: "status-rejected",
    };
    const statusText = {
      pending: "⏳ Pending",
      accepted: "✅ Accepted",
      rejected: "❌ Rejected",
    };
    return (
      <span className={`status-badge ${statusClass[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const handleStatusUpdate = (appId, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  return (
    <div className="company-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 style={{color:"#ffff"}} className="header-title">
            <span className="title-icon">👥</span>
            Applications for Your Company
          </h1>
          <p className="header-subtitle">
            Review and manage student applications with ease
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card pending">
            <span className="stat-number">
              {applications.filter((a) => a.status === "pending").length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card accepted">
            <span className="stat-number">
              {applications.filter((a) => a.status === "accepted").length}
            </span>
            <span className="stat-label">Accepted</span>
          </div>
          <div className="stat-card rejected">
            <span className="stat-number">
              {applications.filter((a) => a.status === "rejected").length}
            </span>
            <span className="stat-label">Rejected</span>
          </div>
          <div className="stat-card total">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="search-input"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters-wrapper">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="score">Highest Score</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading applications...</p>
        </div>
      )}

      {/* Applications List */}
      {!loading && (
        <div className="applications-container">
          {filteredApplications.length > 0 ? (
            <div className="applications-grid">
              {filteredApplications.map((app, index) => (
                <div
                  key={app.id}
                  className="application-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-header">
                    <div className="student-info">
                      <div className="student-avatar">
                        {app.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div className="student-details">
                        <h3 className="student-name">{app.studentName}</h3>
                        <p className="student-position">{app.position}</p>
                      </div>
                    </div>
                    <div className="card-actions">
                      {getStatusBadge(app.status)}
                      {/* <div className="score-badge">{app.score}/10</div> */}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="info-row">
                      <span className="info-icon">📧</span>
                      <a href={`mailto:${app.email}`} className="info-text">
                        {app.email}
                      </a>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">📱</span>
                      <a href={`tel:${app.phone}`} className="info-text">
                        {app.phone}
                      </a>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">📅</span>
                      <span className="info-text">
                        Applied:{" "}
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn-view-cv"
                      onClick={() => setSelectedCV(app.cv)}
                    >
                      📄 View Full CV
                    </button>
                    <div className="status-actions">
                      <button
                        className="btn-accept"
                        onClick={() => handleStatusUpdate(app.id, "accepted")}
                        disabled={app.status === "accepted"}
                      >
                        ✓ Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleStatusUpdate(app.id, "rejected")}
                        disabled={app.status === "rejected"}
                      >
                        ✕ Reject
                      </button>
                      <button
                        className="btn-padding"
                        onClick={() => handleStatusUpdate(app.id, "pending")}
                        disabled={app.status === "pending"}
                      >
                        ⏳ pending
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No Applications Found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}

      {/* CV Modal */}
      {selectedCV && (
        <div className="cv-modal-overlay" onClick={() => setSelectedCV(null)}>
          <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCV(null)}>
              ✕
            </button>

            <div className="cv-content">
              <div className="cv-header">
                <h2>{selectedCV.fullName}</h2>
                <p>{selectedCV.summary}</p>
              </div>

              <div className="cv-section">
                <h3 className="section-title">📌 Contact Information</h3>
                <div className="cv-info">
                  <p>
                    <strong>Email:</strong> {selectedCV.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedCV.phone}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedCV.location}
                  </p>
                </div>
              </div>

              {selectedCV.experience && selectedCV.experience.length > 0 && (
                <div className="cv-section">
                  <h3 className="section-title">💼 Experience</h3>
                  {selectedCV.experience.map((exp, idx) => (
                    <div key={idx} className="cv-item">
                      <h4>{exp.company}</h4>
                      <p className="job-title">{exp.position}</p>
                      <p className="duration">{exp.duration}</p>
                      <p className="description">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedCV.education && selectedCV.education.length > 0 && (
                <div className="cv-section">
                  <h3 className="section-title">🎓 Education</h3>
                  {selectedCV.education.map((edu, idx) => (
                    <div key={idx} className="cv-item">
                      <h4>{edu.school}</h4>
                      <p className="degree">{edu.degree}</p>
                      <p className="year">
                        {edu.year} {edu.cgpa && `• CGPA: ${edu.cgpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {selectedCV.skills && selectedCV.skills.length > 0 && (
                <div className="cv-section">
                  <h3 className="section-title">⚡ Skills</h3>
                  <div className="skills-list">
                    {selectedCV.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCV.certifications &&
                selectedCV.certifications.length > 0 && (
                  <div className="cv-section">
                    <h3 className="section-title">🏆 Certifications</h3>
                    <ul className="certifications-list">
                      {selectedCV.certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-modal-close"
                onClick={() => setSelectedCV(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
