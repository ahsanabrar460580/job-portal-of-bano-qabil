import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        token: 'mock-token-' + Date.now(),
      };
      register(userData);

      // Redirect based on role
      if (formData.role === 'student') {
        navigate('/student-profile');
      } else if (formData.role === 'company') {
        navigate('/company-profile');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Create Account on BanoQabil.pk</h1>
        <p className="form-subtitle">Join Pakistan's largest job portal</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Your Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">👨‍🎓 Student/Job Seeker</option>
              <option value="company">🏢 Company/Employer</option>
              <option value="admin">🔐 Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Create Account
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;