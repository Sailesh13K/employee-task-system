const Employee = require('../models/Employee');
const Task = require('../models/Task');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Public
const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });

    const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    res.status(200).json({
      totalEmployees,
      totalTasks,
      completedPercentage: Math.round(completedPercentage),
      taskDistribution: {
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
