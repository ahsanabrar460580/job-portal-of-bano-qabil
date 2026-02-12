import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Home = () => {
  return (
    <div className="page-container">
      <section className="hero">
        <h1>Welcome to BanoQabil.pk</h1>
        <p>Pakistan's Premier Job Portal</p>
        <p className="hero-subtitle">Connecting Students & Companies</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>👨‍🎓 For Students</h3>
            <p>
              Create your profile, add your skills, and get matched with companies
              that need your talents. Apply directly to internships and jobs.
            </p>
          </div>
          <div className="feature-card">
            <h3>🏢 For Companies</h3>
            <p>
              Post job openings, review student CVs, and find the perfect candidates
              for your team. Manage all applications in one place.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔐 For Admins</h3>
            <p>
              Manage the entire platform. Add/remove students and companies.
              Monitor all activities and ensure quality.
            </p>
          </div>
        </div>
      </section>

      <section className="stats">
        <h2>Our Platform</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Registered Companies</p>
          </div>
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Job Postings</p>
          </div>
          <div className="stat-card">
            <h3>2000+</h3>
            <p>Successful Placements</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;