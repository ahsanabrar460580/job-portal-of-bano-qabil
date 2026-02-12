import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SkillBasedCompanies.css";

// Mock Database - Companies with required skills (moved to module scope to fix ESLint warnings)
const companiesDatabase = [
  {
    id: 1,
    name: "Tech Corp",
    logo: "🏢",
    website: "www.techcorp.com",
    location: "📍 Karachi, Pakistan",
    description: "Leading technology innovation company",
    requiredSkills: ["React", "JavaScript", "Node.js"],
    openPositions: 5,
    salary: "Rs. 100,000 - 150,000",
    aboutCompany:
      "Building scalable web solutions since 2015. We are a team of 50+ talented developers.",
    benefits: [
      "Health Insurance",
      "Remote Work",
      "Learning Budget",
      "Stock Options",
    ],
    industry: "Technology",
  },
  {
    id: 2,
    name: "StartUp Inc",
    logo: "🚀",
    website: "www.startupinc.com",
    location: "📍 Lahore, Pakistan",
    description: "Fast-growing startup focused on AI",
    requiredSkills: ["Python", "Machine Learning", "Data Science"],
    openPositions: 3,
    salary: "Rs. 80,000 - 120,000",
    aboutCompany:
      "Pioneering AI solutions for businesses. Backed by top-tier investors.",
    benefits: [
      "Flexible Hours",
      "Career Growth",
      "Team Outings",
      "Startup Equity",
    ],
    industry: "AI/ML",
  },
  {
    id: 3,
    name: "Design Studio",
    logo: "🎨",
    website: "www.designstudio.com",
    location: "📍 Islamabad, Pakistan",
    description: "Creative design and branding agency",
    requiredSkills: ["Figma", "UI/UX", "Adobe XD", "CSS"],
    openPositions: 2,
    salary: "Rs. 70,000 - 110,000",
    aboutCompany:
      "Creating beautiful digital experiences. Award-winning design agency.",
    benefits: [
      "Portfolio Building",
      "Mentorship",
      "Conference Tickets",
      "Creative Freedom",
    ],
    industry: "Design",
  },
  {
    id: 4,
    name: "Cloud Systems",
    logo: "☁️",
    website: "www.cloudsystems.com",
    location: "📍 Hyderabad, Pakistan",
    description: "Cloud infrastructure and DevOps",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Linux"],
    openPositions: 4,
    salary: "Rs. 120,000 - 180,000",
    aboutCompany:
      "Enterprise cloud solutions provider serving Fortune 500 companies.",
    benefits: [
      "Certification Programs",
      "Hardware Allowance",
      "Relocation",
      "Bonus Structure",
    ],
    industry: "Cloud/DevOps",
  },
  {
    id: 5,
    name: "Mobile Innovations",
    logo: "📱",
    website: "www.mobileinnovations.com",
    location: "📍 Multan, Pakistan",
    description: "Mobile app development company",
    requiredSkills: ["React Native", "Flutter", "JavaScript", "Java"],
    openPositions: 6,
    salary: "Rs. 90,000 - 140,000",
    aboutCompany:
      "Creating innovative mobile solutions with 100+ apps in the market.",
    benefits: [
      "App Launch Bonus",
      "Side Project Support",
      "Tech Books",
      "Gym Membership",
    ],
    industry: "Mobile Development",
  },
  {
    id: 6,
    name: "Data Analytics Pro",
    logo: "📊",
    website: "www.dataanalyticspro.com",
    location: "📍 Karachi, Pakistan",
    description: "Business intelligence and analytics",
    requiredSkills: ["SQL", "Tableau", "Python", "Power BI"],
    openPositions: 3,
    salary: "Rs. 100,000 - 150,000",
    aboutCompany:
      "Turning data into insights. Serving 200+ enterprise clients.",
    benefits: [
      "Dashboard Certification",
      "Client Exposure",
      "Analytics Tools",
      "Performance Bonus",
    ],
    industry: "Data Analytics",
  },
  {
    id: 7,
    name: "Full Stack Solutions",
    logo: "⚙️",
    website: "www.fullstacksolutions.com",
    location: "📍 Peshawar, Pakistan",
    description: "End-to-end development services",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
    openPositions: 5,
    salary: "Rs. 95,000 - 145,000",
    aboutCompany:
      "Complete web and app development. 10 years of industry experience.",
    benefits: [
      "Training Programs",
      "Project Choice",
      "Mentoring Opportunities",
      "Growth Path",
    ],
    industry: "Full Stack",
  },
  {
    id: 8,
    name: "Cyber Security Corp",
    logo: "🔒",
    website: "www.cybersecuritycorp.com",
    location: "📍 Rawalpindi, Pakistan",
    description: "Enterprise cybersecurity solutions",
    requiredSkills: ["JavaScript", "Network Security", "Python", "Linux"],
    openPositions: 2,
    salary: "Rs. 110,000 - 160,000",
    aboutCompany:
      "Protecting digital assets for top companies. ISO 27001 certified.",
    benefits: [
      "Security Clearance",
      "Certifications",
      "Premium Tools",
      "Executive Mentoring",
    ],
    industry: "Cybersecurity",
  },
];

const SkillBasedCompanies = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [studentSkills, setStudentSkills] = useState([]);
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSkill, setFilterSkill] = useState("");
  const [sortBy, setSortBy] = useState("match");

  useEffect(() => {
    // Simulate user skills from profile
    if (user?.skills) {
      setStudentSkills(user.skills);
    } else {
      setStudentSkills(["React", "JavaScript", "CSS", "HTML"]);
    }

    // Calculate match percentage
    setTimeout(() => {
      const matched = companiesDatabase.map((company) => {
        const skills = user?.skills || ["React", "JavaScript", "CSS", "HTML"];
        const matchedSkills = company.requiredSkills.filter((skill) =>
          skills.includes(skill),
        );
        const matchPercentage = Math.round(
          (matchedSkills.length / company.requiredSkills.length) * 100,
        );
        return { ...company, matchPercentage, matchedSkills };
      });

      setMatchedCompanies(matched);
      setFilteredCompanies(matched);
      setLoading(false);
    }, 1000);
  }, [user?.skills]);

  // Filter and sort
  useEffect(() => {
    let filtered = matchedCompanies.filter((company) => {
      if (filterSkill === "") return true;
      return company.requiredSkills.includes(filterSkill);
    });

    filtered.sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "positions") return b.openPositions - a.openPositions;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredCompanies(filtered);
  }, [filterSkill, sortBy, matchedCompanies]);

  const allSkills = [
    ...new Set(companiesDatabase.flatMap((c) => c.requiredSkills)),
  ];

  const handleViewDetails = (company) => {
    navigate(`/company/${company.id}`, { state: { company } });
  };

  return (
    <div className="find-companies-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" style={{color:"#fff"}}>
            <span className="title-icon">🏢</span>
            Find Your Perfect Company
          </h1>
          <p className="hero-subtitle">
            Discover companies that match your skills and career goals
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">{matchedCompanies.length}</span>
              <span className="stat-text">Companies</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{studentSkills.length}</span>
              <span className="stat-text">Your Skills</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">
                {matchedCompanies.filter((c) => c.matchPercentage >= 80).length}
              </span>
              <span className="stat-text">Perfect Matches</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
      </div>

      {/* Skills Display */}
      <div className="skills-section">
        <h2 className="section-title">📌 Your Skills</h2>
        <div className="skills-container">
          {studentSkills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-chip"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <span className="skill-icon">✓</span>
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Filter by Skill</label>
          <select
            className="filter-select"
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="match">Best Match</option>
            <option value="positions">Most Openings</option>
            <option value="name">Company Name</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p className="loading-text">Finding perfect companies for you...</p>
        </div>
      )}

      {/* Companies Grid */}
      {!loading && (
        <div className="companies-container">
          {filteredCompanies.length > 0 ? (
            <div className="companies-grid">
              {filteredCompanies.map((company, idx) => (
                <div
                  key={company.id}
                  className="company-card"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="card-top-bar">
                    <span className="match-badge">
                      {company.matchPercentage}% Match
                    </span>
                    <span className="company-industry">{company.industry}</span>
                  </div>

                  <div className="company-header">
                    <div className="company-logo">{company.logo}</div>
                    <h3 className="company-name">{company.name}</h3>
                  </div>

                  <p className="company-description">{company.description}</p>

                  <div className="company-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📍</span>
                      <span>{company.location}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">💼</span>
                      <span>{company.openPositions} Openings</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">💰</span>
                      <span>{company.salary}</span>
                    </div>
                  </div>

                  <div className="match-progress">
                    <div className="progress-label">Match Score</div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${company.matchPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="matched-skills">
                    <span className="matched-label">Matched Skills:</span>
                    <div className="skill-tags">
                      {company.matchedSkills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="missing-skills">
                    {company.requiredSkills.filter(
                      (s) => !studentSkills.includes(s),
                    ).length > 0 && (
                      <>
                        <span className="missing-label">Skills to Learn:</span>
                        <div className="skill-tags">
                          {company.requiredSkills
                            .filter((s) => !studentSkills.includes(s))
                            .map((skill, idx) => (
                              <span key={idx} className="skill-tag missing">
                                {skill}
                              </span>
                            ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-view-details"
                      onClick={() => handleViewDetails(company)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn-apply"
                      onClick={() => handleViewDetails(company)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No Companies Found</h3>
              <p>
                Try adjusting your filters or learn new skills to match more
                companies
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillBasedCompanies;
