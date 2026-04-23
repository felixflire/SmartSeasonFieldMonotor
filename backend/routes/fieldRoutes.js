
const db = require('../database/db')
const express = require('express'); 
const cors = require('cors');
const router = express.Router();
const app = express();


app.use(cors());
app.use(express.json());




module.exports = function(app) {

  //gets the ellements displayed in the field agents dashbord as they login

app.get('/field_table/:agent_name', (req, res) => {
  const { agent_name } = req.params;
  const query = `
    SELECT 
      ft.field_id, 
      ft.field_stage,
      fa.field_report AS observations,
      fa.id
    FROM field_table ft
    LEFT JOIN field_agent fa ON ft.field_id = fa.assigned_field
     WHERE fa.field_agent_name = ?
    ORDER BY ft.field_id ASC
  `;
  
  db.query(query, [agent_name], (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
});
//---------------------------------------------------

//-------------------------------------------------

//adds the ellements  to the field agents table displayed in the admin page and sends to the admin.js
app.post('/agents/add', (req, res) => {
  const { assigned_field, field_agent_name, email, field_report } = req.body;

  // check if agent_name exists in registered_agents
  const checkSql = 'SELECT agent_name FROM registered_agents WHERE agent_name = ?';
  db.query(checkSql, [field_agent_name], (err, checkResults) => {
    if (err) return res.status(500).json({ success: false, error: err.sqlMessage });
    
    if (checkResults.length === 0) {
      return res.status(404).json({ success: false, error: `Agent "${field_agent_name}" is not registered` });
    }

    // agent exists, go ahead and add
    const sql = 'INSERT INTO field_agent (assigned_field, field_agent_name, email, field_report) VALUES (?, ?, ?, ?)';
    db.query(sql, [assigned_field, field_agent_name, email, field_report], (err, results) => {
      if (err) return res.status(500).json({ success: false, error: err.sqlMessage });
      res.json({ success: true });
    });
  });
});
//----------------------------------------------------

//-------------------------------------------------------

//eddits the field stage element in the agents table sent to the index.js file to be displayed in the agents dashbord
app.put('/field_stage/:id', (req, res) => {
  const { id } = req.params;
  const { field_stage } = req.body;

  // first get the field_id from field_agent using field_agent.id
  const getSql = 'SELECT assigned_field FROM field_agent WHERE id = ?';
  db.query(getSql, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.sqlMessage });
    if (results.length === 0) return res.json({ success: false, message: 'Agent not found' });

    const field_id = results[0].assigned_field;

    // now update field_table using that field_id
    const updateSql = 'UPDATE field_table SET field_stage = ? WHERE field_id = ?';
    db.query(updateSql, [field_stage, field_id], (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.sqlMessage });
      if (result.affectedRows === 0) return res.json({ success: false, message: 'Field not found' });
      res.json({ success: true });
    });
  });
});

// eddits the observations in the observations of the field table inside the agent dashbord through index.js
app.put('/field_report/:id', (req, res) => {
  const id = req.params.id;
  const { field_report } = req.body;

  const sql = 'UPDATE field_agent SET field_report = ? WHERE id = ?';

  try {
    db.execute(sql, [field_report, id]);
    console.log('✅ Field report updated');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error updating report:', error.message);
    res.json({ success: false, error: error.message });
  }
});

}
