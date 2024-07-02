const express = require('express'); // framework of Node.js
const mysql = require('mysql');
const cors = require('cors')

const app = express(); // used to define routes, handle requests, and set up server.
app.use(cors())

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "your-db-password",
        database: "finance-app-db"
    }
)

app.get('/transactions', (req, res) => {
    const q = "SELECT * FROM transactions";
    db.query(q, (error, data) => {
        if (error) return res.json(error);
        return res.json(data); 
    })
})

app.post('/add-transaction', (req, res) => {
    const q = "INSERT INTO transactions (`session_id`, `transaction_timestamp`, `amount`, `transaction_type`, `transaction_category`) VALUES (?, ?, ?, ?, ?)";
    const values = ["session-id", "2024-07-02 13:52:44.000", 49, "debit", "Utilities"];

// INSERT INTO transactions (`session_id`, `transaction_timestamp`, `amount`, `transaction_type`, `transaction_category`) VALUES ("session-id", "2024-07-02 13:52:44.000", 45, "debit", "Utilities")

    db.query(q, values, (error, data) => {
        if (error) return res.json(error);
        return res.json(data); 
    });
});


app.listen(8081, () => {
    console.log("listening");
})