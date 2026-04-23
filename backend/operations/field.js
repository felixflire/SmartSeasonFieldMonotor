const db= require('../database/db');
const readline = require('node:readline/promises');

const { randomUUID } = require('crypto');


module.exports = function(app) {

  // adds field's rows items in the field table sending it to the admin.js
 app.post('/fields/add', (req, res) => {
  
     
    const fieldData = {
      field_id,
      field_name,
      crop_type,
      field_stage,
      field_status,
      planting_date,

    } = req.body;
   
    
    const sql = 'INSERT INTO field_table (field_id, field_name, crop_type, field_stage, field_status, planting_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(sql, [fieldData.field_id, fieldData.field_name, fieldData.crop_type, fieldData.field_stage, fieldData.field_status, fieldData.planting_date])
      try {
       console.log('✅ Field added successfully');
        res.json({ success: true });
       
      } catch(error){
        console.error('❌ Error adding field:', error.message);
      };
      
});

// deletes field rows in the field table and sends to the admin.js

app.delete('/fields/:id', (req, res) => {
  const field_id = req.params.id;

  console.log("Deleting field:", field_id);

  const sql = 'DELETE FROM field_table WHERE field_id = ?';

  db.execute(sql, [field_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: 'Field not found' });
    }

    res.json({ success: true });
  });
});
}
   