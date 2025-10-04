// src/api/expenses.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

// Get token from localStorage
const token = localStorage.getItem("token");

export const fetchExpenses = async () => {
  return await axios.get(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
};