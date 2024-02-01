const sequelize = require('../config/sequelize');
const Internship = require('../models/internship');
const { internshipList } = require('../data/mockData');

sequelize.sync({ force: false }).then(() => {
    Internship.destroy({
        where: {},
        truncate: true 
    })
    .then(() => {
        return Promise.all(internshipList.map(internship => Internship.create(internship)));
    })
    .then(() => {
        console.log("All Internships have been inserted successfully");
        sequelize.close(); 
    })
    .catch(error => {
        console.error("Error inserting Internships:", error);
    });
});