# 🌱 Smart Seasonal Field Monitoring System

## 📌 Overview

The **Smart Seasonal Field Monitoring System** is a full-stack web application designed to help administrators manage agricultural fields and field agents efficiently.

It provides a centralized platform for:

- Managing field data
- Assigning agents to fields
- Monitoring field activities and reports
- Tracking seasonal agricultural progress
- Managing registered agent accounts and credentials

---

## 🚀 Features

### 👨‍💼 Admin Dashboard
- Add and manage fields
- View all field records in a live table
- Add and manage field agents
- Assign agents to specific fields
- Monitor field observations and reports
- Manage registered agent accounts

### 🌾 Field Management
- Track field ID and name
- Monitor crop type and growth stage
- Update field status
- Store planting dates

### 👷 Agent Management
- Assign agents to specific fields
- Store agent details (name, email)
- Record and display field observations

### 🔐 Registered Agents
- Manage agent login accounts (agent number, name, email, password)
- Add and delete registered agents independently from field agents

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Dev Tools |Nodemon (backend) |

---

## 📂 Project Structure

```
Smart-season-field-monitoring-system/
│
├── backend/
│   ├── database/
│   │   └── db.js                  # MySQL connection setup
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── agentRoutes.js
│   │   └── fieldRoutes.js
│   │
│   ├── operations/
│   │   ├── field.js               # Field business logic & queries
│   │   └── field-agents.js        # Agent business logic & queries
│   │
│   └── app.js                  # Express app entry point
│
├── frontend/
│   ├── main/
│   │   ├── pages/
│   │   │   ├── admin.html         # Admin dashboard
│   │   │   └── login.html         # Agent login page
│   │   │
│   │   └── src/
│   │       ├── admin.js           # Admin dashboard logic
│   │       ├── admin.css          # Admin styles
│   │       ├── login.js           # Login logic
│   │       └── login.css          # Login styles
│   │
│   └── home_page/
│       ├── index.html
│       ├── styles.css
│       └── main.js
│
└── README.md
```

---

## 🧱 Backend Architecture

The backend follows a modular structure:

- **routes/** → Handles API endpoints and request routing
- **operations/** → Contains business logic and database queries
- **database/** → Database connection setup

This separation improves code readability, maintainability, and scalability.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/felixflire/SmartSeasonFieldMonotor
cd Smart-season-field-monitoring-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the database

Log into MySQL and create the database and tables:

```sql
CREATE DATABASE smart_season_field_db;
USE smart_season_field_db;

CREATE TABLE fields (
  field_id INT PRIMARY KEY,
  field_name VARCHAR(20),
  crop_type VARCHAR(20),
  field_stage VARCHAR(20),
  field_status VARCHAR(50),
  planting_date DATE
);

CREATE TABLE field_agent (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assigned_field INT,
  field_agent_name VARCHAR(20),
  email VARCHAR(20),
  field_report TEXT
);

CREATE TABLE registered_agents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agent_number INT,
  agent_name VARCHAR(20),
  email VARCHAR(20),
  password VARCHAR(20)
);
```

Then update your credentials in `backend/database/db.js`:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: '',         // your MySQL password
  database: 'smart_season_field_db'
});
```

### 4. Start the backend server

```bash
node server.js
# or with auto-reload:
npx nodemon server.js
```

Backend runs on `http://localhost:8080`.

### 5. Run the frontend

Use **VS Code Live Server** or open the pages directly in your browser:

- `frontend/main/pages/login.html` — Agent login
- `frontend/main/pages/admin.html` — Admin dashboard
- `frontend/home_page/index.html` — Home page

The frontend dev server runs on `http://localhost:5500`.

---

## 🔗 API Endpoints

### 🌾 Field Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/fields` | Fetch all fields |
| POST | `/fields/add` | Add a new field |
| DELETE | `/fields/:id` | Delete a field |

### 👷 Agent Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/agents` | Fetch all field agents |
| POST | `/agents/add` | Add a new field agent |
| DELETE | `/agents/:id` | Delete a field agent |

### 🔐 Registered Agent Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/registered_agents` | Fetch all registered agents |
| POST | `/registered_agents/add` | Add a registered agent |
| DELETE | `/registered_agents/:id` | Delete a registered agent |

### 🔑 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Agent login |

---

## 🧪 Example Requests

**Add Field** — `POST /fields/add`

```json
{
  "field_id": "F001",
  "field_name": "North Farm",
  "crop_type": "Maize",
  "field_stage": "Vegetative",
  "field_status": "Healthy",
  "planting_date": "2026-04-01"
}
```

**Add Registered Agent** — `POST /registered_agents/add`

```json
{
  "agent_number": 2604,
  "agent_name": "Bravin",
  "email": "bravin@gmail.com",
  "password": "securepassword"
}
```

---

## ⚠️ Known Issues

- Minimal form validation on the frontend
- Passwords are stored as plain text (not hashed)
- Page reloads on every add/delete instead of dynamic DOM updates
- Limited error handling on the backend
- Duplicate HTML input IDs across forms can cause wrong values being submitted — ensure each form uses unique IDs (e.g. `reg_email`, `password` for the registered agents form)

---

## 🔮 Future Improvements

- Implement JWT authentication
- Add bcrypt password hashing
- Improve UI responsiveness for mobile
- Add charts and analytics dashboard
- Implement real-time updates (WebSockets)
- Role-based access control (Admin vs Agent)
- Replace page reloads with dynamic DOM updates

---

## 👨‍💻 Author

**Felix Wakhungu Juma**  
📧 felixwakhungujuma@gmail.com

---

## 📜 License

This project is for academic and learning purposes.
