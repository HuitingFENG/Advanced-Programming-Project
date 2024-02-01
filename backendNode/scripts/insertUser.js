const sequelize = require('../config/sequelize');
const User = require('../models/user');
const { userList } = require('../data/mockData');

sequelize.sync({ force: false }).then(() => {
    User.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(userList.map(user => User.create(user)));
    })
    .then(() => {
        console.log("All users have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting users:", error);
    });
});