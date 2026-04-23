console.log('login.js loaded');
// gets the details from the login page
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const agent_number = document.getElementById('agent_number').value;  //gets the details entered from the input
  const password = document.getElementById('password').value;
  const messageEl = document.getElementById('message');

  console.log('B. Sending:', { agent_number, password }); // deburg statement

  try {  //compares the details entered with the ones from the backend and allows proceed to the respective pages
    const res = await fetch('http://localhost:8080/login', {  //fetches data from the agentRoutes file
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_number, password })
    });

    const data = await res.json(); 

    if (res.ok && data.success) {
      messageEl.style.color = 'green';
      messageEl.textContent = `Success! Welcome ${data.agent.agent_name}`;

      
      localStorage.setItem('agent_name', data.agent.agent_name);  // stores the agent name and number from the backend for later use
      localStorage.setItem('agent_number', data.agent.agent_number);
      

  if (password === 'admin') {  //depending on the details entered the user si eighther directed to the admin dashbord or the field agent dashbord
    window.location.href = './admin.html';
  } else {
    window.location.href = './index.html';
  }
      
      
      
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = data.message || 'Invalid credentials';
    }
  } catch (err) {
    console.log('Fetch error:', err);
    messageEl.style.color = 'red';
    messageEl.textContent = 'Cannot connect to server. Is Node running?';
  }
});

