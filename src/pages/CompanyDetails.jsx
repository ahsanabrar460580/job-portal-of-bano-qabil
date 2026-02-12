import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { companiesAPI } from '../services/api';
import './Pages.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Mock data - replace with API call
        setCompany({
          id: id,
          name: 'Apple Inc.',
          website: 'www.apple.com',
          founded: '1976',
          employees: '150,000+',
          industry: 'Technology',
          description: 'Leading technology company focused on innovation',
          openings: [
            { id: 1, title: 'Frontend Developer', location: 'Remote' },
            { id: 2, title: 'Backend Developer', location: 'Bangalore' },
          ],
        });
      } catch (err) {
        console.error('Failed to fetch company', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  if (!company) return <div className="page-container"><p>Company not found</p></div>;

  return (
    <div className="page-container">
      <div className="company-header">
        <h1>{company.name}</h1>
        <p>{company.industry}</p>
      </div>

      <div className="company-info">
        <div className="info-section">
          <h3>About</h3>
          <p>{company.description}</p>
        </div>
        <div className="info-section">
          <h3>Details</h3>
          <p><strong>Website:</strong> <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
          <p><strong>Founded:</strong> {company.founded}</p>
          <p><strong>Employees:</strong> {company.employees}</p>
        </div>
      </div>

      <div className="openings-section">
        <h3>Open Positions</h3>
        {company.openings.length > 0 ? (
          <ul>
            {company.openings.map((opening) => (
              <li key={opening.id}>{opening.title} - {opening.location}</li>
            ))}
          </ul>
        ) : (
          <p>No open positions</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;