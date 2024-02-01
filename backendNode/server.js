const express = require('express');
const session = require('express-session');
const cors = require('cors');
const port = 3001;
const db_connection = require('./config/db_connection');
const sequelize = require('./config/sequelize');

const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes');
const internshipRoutes = require('./routes/internshipRoutes');


const User = require('./models/user');
const Internship = require('./models/internship');
// Define associations
User.hasMany(Internship, { foreignKey: 'studentID' });
Internship.belongsTo(User, { foreignKey: 'studentID', as: 'student' });
User.hasMany(Internship, { foreignKey: 'tutorID' });
Internship.belongsTo(User, { foreignKey: 'tutorID', as: 'tutor' });





app.use('/api/user', userRoutes); 
app.use('/api/internship', internshipRoutes); 


sequelize.sync(/* { force: true } */)
  .then(() => console.log('Tables have been successfully created, if they were not existing before'))
  .catch(error => console.error('This error occured', error));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

