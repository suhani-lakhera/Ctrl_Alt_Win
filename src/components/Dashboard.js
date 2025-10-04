import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../api/expenses"; // ✅ import the API helper

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses()
      .then(res => setExpenses(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Dashboard</h2>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map(exp => (
            <li key={exp._id}>
              {exp.category} — ${exp.amount} — {exp.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;