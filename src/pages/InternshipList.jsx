import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsAPI } from '../services/api';
import './Pages.css';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Mock data - replace with API call
        setInternships([
          {
            id: 1,
            title: 'Frontend Developer Intern',
            company: 'Apple Inc.',
            location: 'Remote',
            duration: '3 months',
            stipend: '₹15,000/month',
            description: 'Work on modern React applications',
          },
          {
            id: 2,
            title: 'Backend Developer Intern',
            company: 'folio3 Inc',
            location: 'Dubai',
            duration: '6 months',
            stipend: '₹20,000/month',
            description: 'Build scalable backend services',
          },
          {
            id: 3,
            title: 'UI/UX Designer Intern',
            company: 'Design Studio',
            location: 'Karachi',
            duration: '3 months',
            stipend: '₹12,000/month',
            description: 'Create beautiful user interfaces',
          },
          {
            id: 4,
            title: 'Designer Intern',
            company: 'Entrepreneurs Pvt Ltd',
            location: 'Islamabad',
            duration: '6 months',
            stipend: '₹15,000/month',
            description: 'Create beautiful user interfaces',
          },
          {
            id: 5,
            title: 'UI/UX Designer Intern',
            company: 'Tech Solutions',
            location: 'Lahore',
            duration: '6 months',
            stipend: '₹10,000/month',
            description: 'Create beautiful user interfaces',
          },
          {
            id: 6,
            title: 'Shopify developer Intern',
            company: 'Web Solutions',
            location: 'Multan',
            duration: '8 months',
            stipend: '₹30,000/month',
            description: 'Create beautiful user interfaces',
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch internships', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  if (loading) return <div className="page-container"><p>Loading internships...</p></div>;

  return (
    <div className="page-container">
      <h1>Internship Opportunities</h1>
      <div className="internships-grid">
        {internships.map((internship) => (
          <div key={internship.id} className="card">
            <h3>{internship.title}</h3>
            <p className="company">{internship.company}</p>
            <p><strong>Location:</strong> {internship.location}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Stipend:</strong> {internship.stipend}</p>
            <p>{internship.description}</p>
            <Link to={`/internships/${internship.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipList;