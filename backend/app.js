const db = require('./database/db');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import and pass app directly
require('./routes/agentRoutes')(app);
require('./routes/fieldRoutes')(app);
require('./routes/adminRoutes')(app);
require('./operations/field')(app);
require('./operations/field-agent')(app);

app.listen(8080, () => console.log("Server running on http://localhost:8080"));