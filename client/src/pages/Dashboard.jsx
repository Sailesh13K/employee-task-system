import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FaUsers, FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { dashboardStats, getDashboardStats, loading } = useContext(GlobalContext);

  useEffect(() => {
    getDashboardStats();
  }, []);

  if (loading || !dashboardStats) {
    return <div className="p-8">Loading...</div>;
  }

  const pieData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          dashboardStats.taskDistribution.pending,
          dashboardStats.taskDistribution.inProgress,
          dashboardStats.taskDistribution.completed,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [
            dashboardStats.taskDistribution.pending,
            dashboardStats.taskDistribution.inProgress,
            dashboardStats.taskDistribution.completed,
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
              <FaUsers size={24} />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Employees</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{dashboardStats.totalEmployees}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(54, 162, 235, 0.1)', color: '#36a2eb' }}>
              <FaTasks size={24} />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Tasks</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{dashboardStats.totalTasks}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(75, 192, 192, 0.1)', color: '#4bc0c0' }}>
              <FaCheckCircle size={24} />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Completion Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{dashboardStats.completedPercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Task Distribution</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Task Overview</h3>
          <div style={{ height: '300px' }}>
            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
