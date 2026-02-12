import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('companies');
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [companyFilterStatus, setCompanyFilterStatus] = useState('all');
  const [studentFilterStatus, setStudentFilterStatus] = useState('all');
  const [companySortBy, setCompanySortBy] = useState('name');
  const [studentSortBy, setStudentSortBy] = useState('name');

  const [companyFormData, setCompanyFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    location: '',
    website: '',
    employees: '',
    established: '',
    description: '',
  });

  const [studentFormData, setStudentFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    education: '',
    gpa: '',
    bio: '',
  });

  // Mock data initialization
  useEffect(() => {
    setTimeout(() => {
      setCompanies([
        {
          id: 1,
          companyName: 'Tech Solutions Pakistan',
          email: 'hr@techsol.pk',
          phone: '+92-300-1111111',
          industry: 'IT & Software',
          location: 'Karachi',
          website: 'www.techsol.pk',
          employees: 150,
          established: '2015',
          description: 'Leading IT solutions provider',
          status: 'active',
          joinedDate: '2024-01-10',
          openings: 12,
        },
        {
          id: 2,
          companyName: 'Digital Innovation Hub',
          email: 'careers@digiinno.pk',
          phone: '+92-321-2222222',
          industry: 'Digital Marketing',
          location: 'Lahore',
          website: 'www.digiinno.pk',
          employees: 75,
          established: '2018',
          description: 'Digital marketing and branding',
          status: 'active',
          joinedDate: '2024-02-05',
          openings: 8,
        },
        {
          id: 3,
          companyName: 'Mobile Apps Studio',
          email: 'info@mobileapp.pk',
          phone: '+92-333-3333333',
          industry: 'Mobile Development',
          location: 'Islamabad',
          website: 'www.mobileapp.pk',
          employees: 45,
          established: '2020',
          description: 'Custom mobile app development',
          status: 'pending',
          joinedDate: '2024-03-01',
          openings: 5,
        },
        {
          id: 4,
          companyName: 'Finance Pro Services',
          email: 'admin@financepro.pk',
          phone: '+92-345-4444444',
          industry: 'Financial Services',
          location: 'Karachi',
          website: 'www.financepro.pk',
          employees: 200,
          established: '2010',
          description: 'Financial advisory and services',
          status: 'active',
          joinedDate: '2024-01-20',
          openings: 15,
        },
        {
          id: 5,
          companyName: 'E-Commerce Excellence',
          email: 'recruitment@ecommerce.pk',
          phone: '+92-312-5555555',
          industry: 'E-Commerce',
          location: 'Lahore',
          website: 'www.ecommerce.pk',
          employees: 120,
          established: '2017',
          description: 'Online retail and marketplace',
          status: 'inactive',
          joinedDate: '2023-12-15',
          openings: 0,
        },
      ]);

      setStudents([
        {
          id: 1,
          fullName: 'Ali Ahmed Khan',
          email: 'ali.ahmed@email.com',
          phone: '+92-300-1234567',
          location: 'Karachi',
          skills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
          education: 'Bachelor in Computer Science',
          gpa: '3.8',
          bio: 'Passionate full-stack developer with 2 years experience',
          status: 'active',
          joinedDate: '2024-01-15',
          applications: 8,
          profileCompletion: 95,
        },
        {
          id: 2,
          fullName: 'Fatima Hassan',
          email: 'fatima.hassan@email.com',
          phone: '+92-321-9876543',
          location: 'Lahore',
          skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
          education: 'Bachelor in Data Science',
          gpa: '3.9',
          bio: 'Data scientist enthusiast with ML expertise',
          status: 'active',
          joinedDate: '2024-02-20',
          applications: 12,
          profileCompletion: 100,
        },
        {
          id: 3,
          fullName: 'Hassan Ali',
          email: 'hassan.ali@email.com',
          phone: '+92-333-5555555',
          location: 'Islamabad',
          skills: ['Java', 'Spring Boot', 'SQL', 'Docker'],
          education: 'Bachelor in Software Engineering',
          gpa: '3.5',
          bio: 'Backend developer focusing on enterprise solutions',
          status: 'active',
          joinedDate: '2024-01-01',
          applications: 5,
          profileCompletion: 85,
        },
        {
          id: 4,
          fullName: 'Ayesha Malik',
          email: 'ayesha.malik@email.com',
          phone: '+92-345-4444444',
          location: 'Rawalpindi',
          skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
          education: 'Diploma in Graphic Design',
          gpa: '3.7',
          bio: 'Creative UI/UX designer with modern design skills',
          status: 'pending',
          joinedDate: '2024-03-10',
          applications: 3,
          profileCompletion: 70,
        },
        {
          id: 5,
          fullName: 'Muhammad Usman',
          email: 'usman.m@email.com',
          phone: '+92-312-6666666',
          location: 'Karachi',
          skills: ['PHP', 'Laravel', 'WordPress'],
          education: 'Associate in IT',
          gpa: '3.2',
          bio: 'Web developer with WordPress expertise',
          status: 'inactive',
          joinedDate: '2023-11-30',
          applications: 0,
          profileCompletion: 60,
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Company Management Functions
  const handleAddCompany = () => {
    if (companyFormData.companyName && companyFormData.email) {
      const newCompany = {
        id: companies.length + 1,
        ...companyFormData,
        employees: parseInt(companyFormData.employees),
        status: 'pending',
        joinedDate: new Date().toISOString().split('T')[0],
        openings: 0,
      };
      setCompanies([...companies, newCompany]);
      setCompanyFormData({
        companyName: '',
        email: '',
        phone: '',
        industry: '',
        location: '',
        website: '',
        employees: '',
        established: '',
        description: '',
      });
      setShowAddCompanyForm(false);
      alert('Company added successfully!');
    }
  };

  const handleDeleteCompany = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const handleUpdateCompanyStatus = (id, newStatus) => {
    setCompanies(
      companies.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  // Student Management Functions
  const handleAddStudent = () => {
    if (studentFormData.fullName && studentFormData.email) {
      const skillsArray = studentFormData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill);
      
      const newStudent = {
        id: students.length + 1,
        ...studentFormData,
        skills: skillsArray,
        gpa: parseFloat(studentFormData.gpa),
        status: 'pending',
        joinedDate: new Date().toISOString().split('T')[0],
        applications: 0,
        profileCompletion: 70,
      };
      setStudents([...students, newStudent]);
      setStudentFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        skills: '',
        education: '',
        gpa: '',
        bio: '',
      });
      setShowAddStudentForm(false);
      alert('Student added successfully!');
    }
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleUpdateStudentStatus = (id, newStatus) => {
    setStudents(
      students.map(s => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  // Filter and Sort Functions
  const filteredCompanies = companies
    .filter(c => {
      const matchesSearch =
        c.companyName.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(companySearchTerm.toLowerCase());
      const matchesFilter = companyFilterStatus === 'all' || c.status === companyFilterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (companySortBy === 'name') return a.companyName.localeCompare(b.companyName);
      if (companySortBy === 'date') return new Date(b.joinedDate) - new Date(a.joinedDate);
      if (companySortBy === 'openings') return b.openings - a.openings;
      return 0;
    });

  const filteredStudents = students
    .filter(s => {
      const matchesSearch =
        s.fullName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
        s.location.toLowerCase().includes(studentSearchTerm.toLowerCase());
      const matchesFilter = studentFilterStatus === 'all' || s.status === studentFilterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (studentSortBy === 'name') return a.fullName.localeCompare(b.fullName);
      if (studentSortBy === 'date') return new Date(b.joinedDate) - new Date(a.joinedDate);
      if (studentSortBy === 'gpa') return b.gpa - a.gpa;
      return 0;
    });

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied">
        <div className="denied-content">
          <div className="denied-icon">🔒</div>
          <h2>Access Denied</h2>
          <p>Only administrators can access this panel.</p>
          <button onClick={() => navigate('/')} className="btn-home">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {loading && (
        <div className="loading-overlay">
          <div className="loader-spinner"></div>
          <p>Loading Admin Panel...</p>
        </div>
      )}

      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1 className="admin-title" style={{color:"#fff"}}>
            <span className="admin-icon">⚙️</span>
            Admin Panel
          </h1>
          <p className="admin-subtitle">Manage companies and students</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{companies.length}</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{students.length}</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{companies.filter(c => c.status === 'active').length + students.filter(s => s.status === 'active').length}</span>
            <span className="stat-label">Active Users</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            <span className="tab-icon">🏢</span>
            Companies Management
          </button>
          <button
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <span className="tab-icon">👥</span>
            Students Management
          </button>
        </div>

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="tab-content">
            {/* Controls */}
            <div className="controls-section">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={companySearchTerm}
                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={companyFilterStatus}
                  onChange={(e) => setCompanyFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={companySortBy}
                  onChange={(e) => setCompanySortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="openings">Sort by Openings</option>
                </select>
              </div>
              <button
                className="btn-add-company"
                onClick={() => setShowAddCompanyForm(!showAddCompanyForm)}
              >
                <span>➕</span>
                {showAddCompanyForm ? 'Cancel' : 'Add Company'}
              </button>
            </div>

            {/* Add Company Form */}
            {showAddCompanyForm && (
              <div className="add-company-form">
                <h3>Add New Company</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyFormData.companyName}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, companyName: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={companyFormData.email}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, email: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={companyFormData.phone}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, phone: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    value={companyFormData.industry}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, industry: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={companyFormData.location}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, location: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="Website"
                    value={companyFormData.website}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, website: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Employees"
                    value={companyFormData.employees}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, employees: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Established Year"
                    value={companyFormData.established}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, established: e.target.value })}
                    className="form-input"
                  />
                  <textarea
                    placeholder="Company Description"
                    value={companyFormData.description}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, description: e.target.value })}
                    className="form-input form-textarea"
                    style={{ gridColumn: '1 / -1' }}
                  />
                </div>
                <button className="btn-submit-form" onClick={handleAddCompany}>
                  Add Company
                </button>
              </div>
            )}

            {/* Companies Grid */}
            <div className="companies-grid">
              {filteredCompanies.map((company, index) => (
                <div key={company.id} className="company-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="company-header">
                    <div className="company-icon">🏢</div>
                    <span className={`status-badge status-${company.status}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </div>

                  <h3 className="company-name">{company.companyName}</h3>
                  <p className="company-industry">{company.industry}</p>

                  <div className="company-details">
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span className="detail-text">{company.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📱</span>
                      <span className="detail-text">{company.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{company.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span className="detail-text">{company.employees} Employees</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📂</span>
                      <span className="detail-text">{company.openings} Openings</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <select
                      value={company.status}
                      onChange={(e) => handleUpdateCompanyStatus(company.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      className="btn-view"
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowCompanyModal(true);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCompany(company.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="tab-content">
            {/* Controls */}
            <div className="controls-section">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={studentFilterStatus}
                  onChange={(e) => setStudentFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={studentSortBy}
                  onChange={(e) => setStudentSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="gpa">Sort by GPA</option>
                </select>
              </div>
              <button
                className="btn-add-company"
                onClick={() => setShowAddStudentForm(!showAddStudentForm)}
              >
                <span>➕</span>
                {showAddStudentForm ? 'Cancel' : 'Add Student'}
              </button>
            </div>

            {/* Add Student Form */}
            {showAddStudentForm && (
              <div className="add-company-form">
                <h3>Add New Student</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={studentFormData.fullName}
                    onChange={(e) => setStudentFormData({ ...studentFormData, fullName: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={studentFormData.email}
                    onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={studentFormData.phone}
                    onChange={(e) => setStudentFormData({ ...studentFormData, phone: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={studentFormData.location}
                    onChange={(e) => setStudentFormData({ ...studentFormData, location: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    value={studentFormData.skills}
                    onChange={(e) => setStudentFormData({ ...studentFormData, skills: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Education"
                    value={studentFormData.education}
                    onChange={(e) => setStudentFormData({ ...studentFormData, education: e.target.value })}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="GPA"
                    step="0.1"
                    min="0"
                    max="4"
                    value={studentFormData.gpa}
                    onChange={(e) => setStudentFormData({ ...studentFormData, gpa: e.target.value })}
                    className="form-input"
                  />
                  <textarea
                    placeholder="Student Bio"
                    value={studentFormData.bio}
                    onChange={(e) => setStudentFormData({ ...studentFormData, bio: e.target.value })}
                    className="form-input form-textarea"
                    style={{ gridColumn: '1 / -1' }}
                  />
                </div>
                <button className="btn-submit-form" onClick={handleAddStudent}>
                  Add Student
                </button>
              </div>
            )}

            {/* Students Grid */}
            <div className="students-grid">
              {filteredStudents.map((student, index) => (
                <div key={student.id} className="student-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="student-header">
                    <div className="student-avatar">{student.fullName.charAt(0)}</div>
                    <span className={`status-badge status-${student.status}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </div>

                  <h3 className="student-name">{student.fullName}</h3>

                  <div className="student-details">
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span className="detail-text">{student.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📱</span>
                      <span className="detail-text">{student.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{student.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⭐</span>
                      <span className="detail-text">GPA: {student.gpa}</span>
                    </div>
                  </div>

                  <div className="skills-section">
                    <h4>Skills</h4>
                    <div className="skills-list">
                      {student.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="student-stats">
                    <div className="stat">
                      <span className="stat-value">{student.applications}</span>
                      <span className="stat-label">Applications</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{student.profileCompletion}%</span>
                      <span className="stat-label">Profile</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <select
                      value={student.status}
                      onChange={(e) => handleUpdateStudentStatus(student.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      className="btn-view"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowStudentModal(true);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Company Modal */}
      {showCompanyModal && selectedCompany && (
        <div className="modal-overlay" onClick={() => setShowCompanyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowCompanyModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <h2>{selectedCompany.companyName}</h2>
              <span className={`status-badge status-${selectedCompany.status}`}>
                {selectedCompany.status.toUpperCase()}
              </span>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-item">
                  <label>Email</label>
                  <p>{selectedCompany.email}</p>
                </div>
                <div className="modal-item">
                  <label>Phone</label>
                  <p>{selectedCompany.phone}</p>
                </div>
                <div className="modal-item">
                  <label>Website</label>
                  <p><a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a></p>
                </div>
                <div className="modal-item">
                  <label>Industry</label>
                  <p>{selectedCompany.industry}</p>
                </div>
                <div className="modal-item">
                  <label>Location</label>
                  <p>{selectedCompany.location}</p>
                </div>
                <div className="modal-item">
                  <label>Established</label>
                  <p>{selectedCompany.established}</p>
                </div>
                <div className="modal-item">
                  <label>Employees</label>
                  <p>{selectedCompany.employees}</p>
                </div>
                <div className="modal-item">
                  <label>Open Positions</label>
                  <p>{selectedCompany.openings}</p>
                </div>
              </div>

              <div className="modal-section">
                <label>Description</label>
                <p>{selectedCompany.description}</p>
              </div>

              <div className="modal-section">
                <label>Joined Date</label>
                <p>{new Date(selectedCompany.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-close" onClick={() => setShowCompanyModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowStudentModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <h2>{selectedStudent.fullName}</h2>
              <span className={`status-badge status-${selectedStudent.status}`}>
                {selectedStudent.status.toUpperCase()}
              </span>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-item">
                  <label>Email</label>
                  <p>{selectedStudent.email}</p>
                </div>
                <div className="modal-item">
                  <label>Phone</label>
                  <p>{selectedStudent.phone}</p>
                </div>
                <div className="modal-item">
                  <label>Location</label>
                  <p>{selectedStudent.location}</p>
                </div>
                <div className="modal-item">
                  <label>GPA</label>
                  <p>{selectedStudent.gpa}</p>
                </div>
                <div className="modal-item">
                  <label>Education</label>
                  <p>{selectedStudent.education}</p>
                </div>
                <div className="modal-item">
                  <label>Applications</label>
                  <p>{selectedStudent.applications}</p>
                </div>
              </div>

              <div className="modal-section">
                <label>Skills</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedStudent.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag" style={{ marginTop: '8px' }}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <label>Bio</label>
                <p>{selectedStudent.bio}</p>
              </div>

              <div className="modal-section">
                <label>Profile Completion</label>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '10px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${selectedStudent.profileCompletion}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '10px',
                  }}></div>
                </div>
                <p style={{ marginTop: '8px', color: '#667eea', fontWeight: '700' }}>{selectedStudent.profileCompletion}%</p>
              </div>

              <div className="modal-section">
                <label>Joined Date</label>
                <p>{new Date(selectedStudent.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-close" onClick={() => setShowStudentModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;