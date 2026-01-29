import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import CompanyProfile from './pages/CompanyProfile';
import Dashboard from './pages/Dashboard';
import SkillBasedCompanies from './pages/SkillBasedCompanies';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminPanel from './pages/AdminPanel';
import StudentCompanyDetail from './pages/StudentCompanyDetail';
import './App.css';

function App() {
  return (
    <div className='home'>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route
              path="/student-profile"
              element={
                <ProtectedRoute roles={['student']}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-based-companies"
              element={
                <ProtectedRoute roles={['student']}>
                  <SkillBasedCompanies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/:companyId"
              element={
                <ProtectedRoute roles={['student']}>
                  <StudentCompanyDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['student']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Company Routes */}
            <Route
              path="/company-profile"
              element={
                <ProtectedRoute roles={['company']}>
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard"
              element={
                <ProtectedRoute roles={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;