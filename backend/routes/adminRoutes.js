const db = require('../database/db')
const express = require('express'); 
const cors = require('cors');
const router = express.Router();
const app = express();


app.use(cors());
app.use(express.json());




module.exports = function(app) {

  //gets all elements in the field table and sends to the index.js to be displayed in the admin dashbord
app.get('/fields', (req, res) => {
  const query = `
    SELECT 
      ft.field_id, 
      ft.field_name,
      ft.crop_type,
      ft.field_stage,
      ft.field_status,
      ft.planting_date
  
    FROM field_table ft
    ORDER BY ft.field_id ASC
  `;
  
  db.query(query,(err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
});

//gets all agents from the agents table and sends to the indes.js
app.get('/agents', (req, res) => {
  const query = `SELECT * FROM field_agent ORDER BY id ASC`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
});

//gets registered agents from the registered agents table and send them to the indes.js
app.get('/registered_agents', (req, res) => {
  const query = `SELECT * FROM registered_agents ORDER BY id ASC`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
});


app.get('/', (req, res) => {
  res.send('running home');
});

}
