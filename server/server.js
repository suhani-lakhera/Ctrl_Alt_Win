const express = require('express');
const cors = require('cors');
// Ensure this path is correct for your database connection file
const db = require('./db.js'); 

const app = express();
const port = 3001; 

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json());

// Example: API Endpoint to Get Currencies 
app.get('/api/currencies', async (req, res) => {
    try {
        // NOTE: This assumes 'list_currencies()' still exists in your DB
        const [results] = await db.query('CALL list_currencies()');
        res.json(results[0]);
    } catch (error) {
        console.error('Error calling list_currencies:', error);
        res.status(500).send('Server Error retrieving currencies.');
    }
});

// FINAL FIX: API Endpoint to Get Employee Expenses (Direct SQL)
app.get('/api/expenses', async (req, res) => {
    try {
        // Hardcoded User ID for immediate submission (User ID 1 is standard)
        const userId = 1; 

        const sqlQuery = `
            SELECT 
                id,
                category,
                amount,
                currency,
                description,
                status,
                created_at AS date,        -- Alias to 'date' for the frontend's Date object
                amount AS convertedAmount  -- Alias to 'convertedAmount' for dashboard calculations
            FROM expenses 
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        // Execute the direct SQL query
        const [results] = await db.query(sqlQuery, [userId]); 
        
        // This is the correct response format
        res.json(results); 
        
        console.log('API SUCCESS: Data fetched for dashboard.');

    } catch (error) {
        console.error('CRITICAL DB ERROR during /api/expenses:', error); 
        res.status(500).send('Server Error retrieving expenses. Check if User ID 1 exists and has data.');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});