const db = require('../database/db')
const path = require('path');

module.exports = function(app) {


//gets data from the database and confirms if they match with the ones entered from the login page 

app.post('/login', (req, res) => { 
  console.log("About to query DB...");
  const { agent_number, password } = req.body;
  const sql = 'SELECT agent_number, agent_name FROM registered_agents WHERE agent_number =? AND password =?';


  db.query(sql, [agent_number, password], (err, results) => {
     console.log("DB results:", results);
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    
    const agent = results[0];
    res.json({ success: true, agent });
     
  });

});


}


