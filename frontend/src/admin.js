

// 2. Initialize the admin page and fetches all field elements
document.addEventListener('DOMContentLoaded', () => {


  fetch('http://localhost:8080/fields') //fetches all field ellements from  field table through the adminRoute.js
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#field_table tbody');
      tbody.innerHTML = '';
      data.forEach(field => {
        
        tbody.innerHTML += `
          <tr>
            <td>${field.field_id}</td>
            <td>${field.field_name}</td>
            <td>${field.crop_type}</td>
            <td>${field.field_stage}</td>
            <td>${field.field_status}</td>
            <td>${field.planting_date}</td>
            <td>
      <button onclick="deleteField(${field.field_id})">Delete</button>
    </td>
          </tr>
        `;
      });
    })

    // fetch all agents
  fetch('http://localhost:8080/agents') //fetches all elements from the agents table through the adminRoutes.js
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#agents_table tbody');
      tbody.innerHTML = '';
      data.forEach(agent => {
         console.log('Agent data:', JSON.stringify(agent));
        tbody.innerHTML += `
          <tr>
            <td>${agent.id}</td>
            <td>${agent.assigned_field}</td>
            <td>${agent.field_agent_name}</td>
            <td>${agent.email}</td>
            <td>${agent.field_report ?? 'No notes'}</td>

            <td>
      <button onclick="deleteAgent(${agent.id})">Delete</button>
    </td>
          </tr>
        `;
      });
    })
 // fetch all registerd agents
  
fetch('http://localhost:8080/registered_agents') // fetches all elements from the registered_agents_table through the adminRoutes
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#registered_agents_table tbody');
    tbody.innerHTML = '';
    data.forEach(agent => {
      console.log('Registered agent data:', JSON.stringify(agent)); 
      tbody.innerHTML += `
        <tr>
          <td>${agent.id}</td>
          <td>${agent.agent_number}</td>
          <td>${agent.agent_name}</td>
          <td>${agent.email}</td>
          <td>${agent.password}</td>
          <td><button onclick="deleteRegisteredAgent(${agent.id})">Delete</button></td>
        </tr>
      `;
    });
  })
  

    
    .catch(err => {
      document.querySelector('#field_table tbody').innerHTML =
        `<tr><td colspan="6">Error: ${err.message}</td></tr>`;
    });

 // deletes the selected item in the field table   
window.deleteField=async function deleteField(id) {
  if (!confirm("Are you sure you want to delete this field?")) return;

  try {
    const res = await fetch(`http://localhost:8080/fields/${id}`, { //fetches the delete operation from fiels.js
      method: 'DELETE'
    });

    const data = await res.json();

    if (data.success) {
      alert("Deleted successfully");
      location.reload();
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


//deletes agent

window.deleteAgent=async function deleteAgent(id) {
  if (!confirm("Are you sure you want to delete this agent?")) return;
  console.log('Deleting agent with ID:', id)

  try {
    const res = await fetch(`http://localhost:8080/agents/${id}`, { //fetches delete operations from the field-agent.js
      method: 'DELETE'
    });

    const data = await res.json();

    if (data.success) {
      alert("Deleted successfully");
      location.reload();
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
//deletes the elements in the registered agents table 
window.deleteRegisteredAgent = async function(id) {
  if (!confirm("Are you sure you want to delete this agent?")) return;

  try {
    const res = await fetch(`http://localhost:8080/registered_agents/${id}`, { //fetches the delete operations from the field-agent.js
      method: 'DELETE'
    });

    const data = await res.json();

    if (data.success) {
      alert("Deleted successfully");
      location.reload();
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}




});

// adds fields ellement
document.getElementById('add_field_btn').addEventListener('click', async () => {

  
  const field = {
    field_id: document.getElementById('field_id').value,
    field_name: document.getElementById('field_name').value,
    crop_type: document.getElementById('crop_type').value,
    field_stage: document.getElementById('field_stage').value,
    field_status: document.getElementById('field_status').value,
    planting_date: document.getElementById('planting_date').value
  };

 
  try {
    const res = await fetch('http://localhost:8080/fields/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field)
    });

    const data = await res.json();

    if (data.success) {
      alert('Field added successfully!');
      location.reload(); // refresh table
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    alert('Cannot connect to server');
  }
});



// adds agent element
document.getElementById('add_field_agent_btn').addEventListener('click', async () => {

  
  const agent = {
    assigned_field: document.getElementById('assigned_field').value,
    field_agent_name: document.getElementById('field_agent_name').value,
    email: document.getElementById('email').value,
    field_report: document.getElementById('field_report').value,
    
  };

 
  try {
    const res = await fetch('http://localhost:8080/agents/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent)
    });

    const data = await res.json();

    if (data.success) {
      alert('agent added successfully!');
      location.reload(); // refresh table
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    alert('Cannot connect to server');
  }
});


// adds registered agents element
document.getElementById('add_registered_field_agent_btn').addEventListener('click', async () => {

  
  const registered_agent = {
    agent_number: document.getElementById('agent_number').value,
    agent_name: document.getElementById('agent_name').value,
    email: document.getElementById('reg_email').value,
    password: document.getElementById('password').value,
};

 
  try {
    const res = await fetch('http://localhost:8080/registered_agents/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registered_agent)
    });

    const data = await res.json();

    if (data.success) {
      alert('agent added successfully!');
      location.reload(); // refresh table
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    alert('Cannot connect to server');
  }
});





