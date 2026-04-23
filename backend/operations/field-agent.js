const db = require('../database/db');
const readline = require('readline/promises'); 
const { stdin: input, stdout: output } = require('process');


module.exports = function(app) {
  //adds agents rows to the agents table sends to the admin.js
 app.post('/agents/add', (req, res) => {
    
    
        const agentData = {
            
            assigned_field,
            field_agent_name,
            email,
            field_report
        } = req.body;
       

        const sql = 'INSERT INTO field_agent ( assigned_field, field_agent_name, email, field_report) VALUES (?, ?, ?, ?)';
         db.execute(sql, [agentData.assigned_field, agentData.field_agent_name, agentData.email, agentData.field_report]);
         try {
        console.log('✅ Field agent added successfully');
         res.json({success: true});
    } catch (error) {
        console.error('❌ Error adding field agent:', error.message);
       
    }
})


//adds registered agents rows to the registered agents table and sends to the admin.js
app.post('/registered_agents/add', (req, res) => {
    const { agent_number, agent_name, email, password } = req.body;

    const sql = 'INSERT INTO registered_agents (agent_number, agent_name, email, password) VALUES (?, ?, ?, ?)';
    
    try {
        db.execute(sql, [agent_number, agent_name, email, password]);
        console.log('✅ Registered agent added successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.json({ success: false, error: error.message });
    }
});


//deletes agent rows from the agents table and send to the admin.js
app.delete('/agents/:id', (req, res) => {
  const id= req.params.id;

  console.log("Deleting agent:", id);

  const sql = 'DELETE FROM field_agent WHERE id = ?';

  db.execute(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: 'agent not found' });
    }

    res.json({ success: true });
  });
});

//deletes elements from the registered agents table and sends to the admin.js
app.delete('/registered_agents/:id', (req, res) => {
  const id = req.params.id;

  db.execute('DELETE FROM registered_agents WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: 'Agent not found' });
    }

    res.json({ success: true });
  });
});

};

    
 
