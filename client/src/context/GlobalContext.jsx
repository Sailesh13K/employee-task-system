import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { API } from '../api';

const initialState = {
  employees: [],
  tasks: [],
  dashboardStats: null,
  loading: true,
  error: null,
};

export const GlobalContext = createContext(initialState);

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES':
      return { ...state, employees: action.payload, loading: false };
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((emp) => emp._id !== action.payload),
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        ),
      };
    case 'GET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case 'GET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload, loading: false };
    case 'TRANSACTION_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Auto-detect API base
  const base = API || "";

  // ===========================
  // Employees
  // ===========================
  async function getEmployees() {
    try {
      const res = await axios.get(`${base}/api/employees`);
      dispatch({ type: 'GET_EMPLOYEES', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function addEmployee(employee) {
    try {
      const res = await axios.post(`${base}/api/employees`, employee);
      dispatch({ type: 'ADD_EMPLOYEE', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function deleteEmployee(id) {
    try {
      await axios.delete(`${base}/api/employees/${id}`);
      dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function updateEmployee(id, updatedEmployee) {
    try {
      const res = await axios.put(`${base}/api/employees/${id}`, updatedEmployee);
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  // ===========================
  // Tasks
  // ===========================
  async function getTasks() {
    try {
      const res = await axios.get(`${base}/api/tasks`);
      dispatch({ type: 'GET_TASKS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function addTask(task) {
    try {
      const res = await axios.post(`${base}/api/tasks`, task);
      dispatch({ type: 'ADD_TASK', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${base}/api/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  async function updateTask(id, updatedTask) {
    try {
      const res = await axios.put(`${base}/api/tasks/${id}`, updatedTask);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  // ===========================
  // Dashboard
  // ===========================
  async function getDashboardStats() {
    try {
      const res = await axios.get(`${base}/api/dashboard`);
      dispatch({ type: 'GET_DASHBOARD_STATS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.message });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        tasks: state.tasks,
        dashboardStats: state.dashboardStats,
        loading: state.loading,
        error: state.error,

        getEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,

        getTasks,
        addTask,
        deleteTask,
        updateTask,

        getDashboardStats,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
