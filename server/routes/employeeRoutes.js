const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

router.route('/').get(getEmployees).post(addEmployee);
router.route('/:id').put(updateEmployee).delete(deleteEmployee);

module.exports = router;
