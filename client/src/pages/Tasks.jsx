import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Tasks = () => {
  const { tasks, employees, getTasks, getEmployees, addTask, deleteTask, updateTask } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'Pending',
    priority: 'Medium',
    deadline: '',
  });

  // Filter State
  const [statusFilter, setStatusFilter] = useState('All');
  const [employeeFilter, setEmployeeFilter] = useState('All');

  useEffect(() => {
    getTasks();
    getEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
        updateTask(currentTaskId, formData);
    } else {
        addTask(formData);
    }
    closeModal();
  };

  const handleStatusChange = (id, newStatus) => {
      const task = tasks.find(t => t._id === id);
      updateTask(id, { ...task, status: newStatus, assignedTo: task.assignedTo._id });
  }

  const openAddModal = () => {
      setIsEditing(false);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        status: 'Pending',
        priority: 'Medium',
        deadline: '',
      });
      setShowModal(true);
  };

  const openEditModal = (task) => {
      setIsEditing(true);
      setCurrentTaskId(task._id);
      setFormData({
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo?._id || '',
          status: task.status,
          priority: task.priority,
          deadline: task.deadline ? task.deadline.split('T')[0] : '',
      });
      setShowModal(true);
  };

  const closeModal = () => {
      setShowModal(false);
      setIsEditing(false);
      setCurrentTaskId(null);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        status: 'Pending',
        priority: 'Medium',
        deadline: '',
      });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#3b82f6';
      default: return '#f59e0b';
    }
  };

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesEmployee = employeeFilter === 'All' || (task.assignedTo && task.assignedTo._id === employeeFilter);
      return matchesStatus && matchesEmployee;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Tasks</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus style={{ marginRight: '0.5rem' }} /> New Task
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <label style={{ color: '#94a3b8' }}>Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: '150px' }}
              >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
              </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <label style={{ color: '#94a3b8' }}>Employee:</label>
              <select 
                value={employeeFilter} 
                onChange={(e) => setEmployeeFilter(e.target.value)}
                style={{ width: '200px' }}
              >
                  <option value="All">All Employees</option>
                  {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
              </select>
          </div>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id}>
                <td>
                  <div style={{ fontWeight: 'bold' }}>{task.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{task.description}</div>
                </td>
                <td>{task.assignedTo?.name || 'Unassigned'}</td>
                <td>
                  <select 
                    value={task.status} 
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    style={{ 
                        padding: '0.25rem', 
                        borderRadius: '4px', 
                        border: 'none', 
                        background: getStatusColor(task.status) + '20', 
                        color: getStatusColor(task.status),
                        fontWeight: '600'
                    }}
                  >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <span style={{ color: getPriorityColor(task.priority), fontWeight: '600' }}>
                    {task.priority}
                  </span>
                </td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => openEditModal(task)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '0.5rem' }}>
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteTask(task._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
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
          <div className="card" style={{ width: '500px', background: '#1e293b' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Task' : 'Create New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3"></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Assigned To</label>
                  <select value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})} required>
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Deadline</label>
                  <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Priority</label>
                  <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" style={{ background: 'transparent', color: '#94a3b8' }} onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create'} Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
