const express = require('express');
const session = require('express-session');
const cors = require('cors');
const loginRouter = require('./routes/login');

const app = express();
const port = 3001;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:root123@localhost:3306/internship_system'); // replace with your connection string


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/test-db', (req, res) => {
  sequelize.authenticate()
    .then(() => res.send('Database connection has been established successfully.'))
    .catch(err => res.send('Unable to connect to the database:', err));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

app.use(cors());