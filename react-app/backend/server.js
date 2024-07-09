const express = require('express'); // framework of Node.js
const mysql = require('mysql');
const cors = require('cors');

const app = express(); // used to define routes, handle requests, and set up server.
app.use(cors())
app.use(express.json()); // middleware to parse automatically parse JSON body

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "manager",
        database: "finance-app-db"
    }
)

app.get('/transactions', (request, response) => {
    const q = "SELECT * FROM transactions"; 

    db.query(q, (error, data) => {
        if (error) return response.json(error);
        return response.json(data); 
    })
})

app.post('/add-transaction', (request, response) => {
    // const { amount, transaction_type, transaction_category } = { "transaction_type": "credit", "transaction_category": "Groceries", "amount": "412" };
    const session_id = "test-session"; // to remove later once we figure out how to create a session
    const { amount, transaction_type, transaction_category, transaction_date } = request.body;
    const parsedAmount = parseFloat(amount);
    const q = "INSERT INTO transactions (`session_id`, `transaction_timestamp`, `amount`, `transaction_type`, `transaction_category`, `transaction_date`) VALUES (?, NOW(), ?, ?, ?, ?)";
    const values = [ session_id, parsedAmount, transaction_type, transaction_category, transaction_date ];

    db.query(q, values, (error, data) => {
        if (error) return response.json(error);
        return response.json(data); 
    });
});

app.put('/update-transaction', (request, response) => {
    const { amount, transaction_type, transaction_category, transaction_date, transaction_id } = request.body;
    
    const q = "UPDATE transactions SET `amount` = ?, `transaction_type` = ?, `transaction_category` = ?, `transaction_date` = ? WHERE `transaction_id` = ?"
    const values = [ amount, transaction_type, transaction_category, transaction_date, transaction_id ];

    db.query(q, values, (error, data) => {
        if (error) return response.json(error);
        return response.json(data); 
    });
});

app.delete('/reset', (request, response) => {
    const session_id = "test-session"// to remove later once we figure out how to create a session
    const q = 'DELETE FROM transactions WHERE session_id = ? ';

    db.query(q, [session_id], (error, data) => {
        if (error) return response.json(error);
        return response.json(data); 
    });        
});


// app.post('/update-transaction', (request, response) => {
//     const transactionId = request.body.transaction_id;
//     let fieldsToUpdate = [];
//     let values = [];

//     if (request.body.transaction_timestamp !== undefined) {
//         fieldsToUpdate.push('`transaction_timestamp` = ?');
//         values.push(request.body.transaction_timestamp);
//     }
//     if (request.body.amount !== undefined) {
//         fieldsToUpdate.push('`amount` = ?');
//         values.push(request.body.amount);
//     }
//     if (request.body.transaction_type !== undefined) {
//         fieldsToUpdate.push('`transaction_type` = ?');
//         values.push(request.body.transaction_type);
//     }
//     if (request.body.transaction_category !== undefined ) { 
//         fieldsToUpdate.push('`transaction_category` = ?');
//         values.push(request.body.transaction_category);
//     }

//     if (fieldsToUpdate.length > 0) {
//         const q = `UPDATE transactions SET ${fieldsToUpdate.join(', ')} WHERE transaction_id = ?`;
//         values.push(transactionId);

//         db.run(q, values, function(error) {
//             if (error) {
//                 response.status(500).json({ error: error.message });
//                 return;
//             }
//             response.json({ message: 'Transaction updated successfully', changes: this.changes });
//         });
//     } else {
//         response.status(400).json({ error: 'No fields to update' });
//     }
// });


app.listen(8081, () => {
    console.log("listening");
})