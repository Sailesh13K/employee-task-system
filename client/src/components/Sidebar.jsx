import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar" style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: 'rgba(15, 23, 42, 0.9)',
      borderRight: '1px solid rgba(148, 163, 184, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
        <h2 style={{ margin: 0, color: '#6366f1', fontSize: '1.5rem' }}>TaskTracker</h2>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/')}`} style={{
            padding: '1rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: isActive('/') ? '#fff' : '#94a3b8',
            background: isActive('/') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <FaHome /> Dashboard
          </div>
        </Link>
        
        <Link to="/employees" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/employees')}`} style={{
            padding: '1rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: isActive('/employees') ? '#fff' : '#94a3b8',
            background: isActive('/employees') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <FaUsers /> Employees
          </div>
        </Link>
        
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${isActive('/tasks')}`} style={{
            padding: '1rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: isActive('/tasks') ? '#fff' : '#94a3b8',
            background: isActive('/tasks') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            transition: 'all 0.2s'
          }}>
            <FaTasks /> Tasks
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
