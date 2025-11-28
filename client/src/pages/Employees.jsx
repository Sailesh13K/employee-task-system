import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import {API} from '../api';
const Employees = () => {
  const { employees, getEmployees, addEmployee, deleteEmployee, updateEmployee } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
  });

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
        updateEmployee(currentEmployeeId, formData);
    } else {
        addEmployee(formData);
    }
    closeModal();
  };

  const openAddModal = () => {
      setIsEditing(false);
      setFormData({ name: '', email: '', department: '', role: '' });
      setShowModal(true);
  };

  const openEditModal = (employee) => {
      setIsEditing(true);
      setCurrentEmployeeId(employee._id);
      setFormData({
          name: employee.name,
          email: employee.email,
          department: employee.department,
          role: employee.role,
      });
      setShowModal(true);
  };

  const closeModal = () => {
      setShowModal(false);
      setIsEditing(false);
      setCurrentEmployeeId(null);
      setFormData({ name: '', email: '', department: '', role: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Employees</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus style={{ marginRight: '0.5rem' }} /> Add Employee
        </button>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', fontSize: '0.875rem' }}>
                    {emp.department}
                  </span>
                </td>
                <td>{emp.role}</td>
                <td>
                  <button onClick={() => openEditModal(emp)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '0.5rem' }}>
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteEmployee(emp._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ width: '400px', background: '#1e293b' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Department</label>
                <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Role</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" style={{ background: 'transparent', color: '#94a3b8' }} onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
