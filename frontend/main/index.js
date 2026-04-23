//This ensures that the field table is displayed showing only the fields that condern the user ie the agent who has logged in and allows the user to add report on the fields assigned

document.addEventListener('DOMContentLoaded', () => {
   const agent_name = localStorage.getItem('agent_name') // retrieve the stored agent_name from the login.js file to be used here since user entered as an agent 

  if (!agent_name) {
    window.location.href = './login.html' 
    return
  }
  
// fetches details from the field table from the backend file fieldRouts and sends the details to be displayed
  fetch(`http://localhost:8080/field_table/${agent_name}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      const tbody = document.querySelector('#table tbody');
      tbody.innerHTML = '';
       data.forEach(field => {
        tbody.innerHTML += `
          <tr>
            <td>${field.field_id}</td>
          
            <td>
        <span id="stage_${field.id}">${field.field_stage}</span>
        <input type="text" id="stage_input_${field.id}" value="${field.field_stage ?? ''}" style="display:none">
        <button onclick="editStage(${field.id})">Edit</button>
        <button id="stage_save_${field.id}" style="display:none" onclick="saveStage(${field.id})">Save</button>
      </td>
            <td>
        <span id="report_${field.id}">${field.observations ?? 'No notes'}</span>
        <input type="text" id="input_${field.id}" value="${field.observations ?? ''}" style="display:none">
        <button onclick="editReport(${field.id})">Edit</button>
        <button id="save_${field.id}" style="display:none" onclick="saveReport(${field.id})">Save</button>
      </td>
          </tr>
           
        `;
      });
    })
    .catch(err => {
      console.error(err);
      document.querySelector('#table tbody').innerHTML = 
        `<tr><td colspan="3">Error: ${err.message}</td></tr>`;
    });

   
//allwows to eddit the report sectionof the fields agent page and give report of the assigned field
window.editReport = function(id) {
  document.getElementById(`report_${id}`).style.display = 'none';
  document.getElementById(`input_${id}`).style.display = 'inline';
  document.getElementById(`save_${id}`).style.display = 'inline';
}

 window.saveReport = async function(id) {
  const field_report = document.getElementById(`input_${id}`).value;

  try {
    const res = await fetch(`http://localhost:8080/field_report/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field_report })
    });

    const data = await res.json();
console.log('this is the data: ')
    if (data.success) {
      alert('Report updated successfully!');
      location.reload();
    } else {
      alert(data.message || 'Update failed');
    }
  } catch (err) {
    alert('Cannot connect to server');
  }
}
//edditing report  ends here

//edditing stage starts here
window.editStage = function(id) {
  document.getElementById(`stage_${id}`).style.display = 'none';
  document.getElementById(`stage_input_${id}`).style.display = 'inline';
  document.getElementById(`stage_save_${id}`).style.display = 'inline';
}

window.saveStage = async function(id) {
  const field_stage = document.getElementById(`stage_input_${id}`).value;
  try {
    const res = await fetch(`http://localhost:8080/field_stage/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field_stage })
    });
    const data = await res.json();
    if (data.success) {
      alert('Stage updated successfully!');
      location.reload();
    } else {
      alert(data.message || 'Update failed');
    }
  } catch (err) {
    alert('Cannot connect to server');
  }
}
//edditing stage ends here
});

