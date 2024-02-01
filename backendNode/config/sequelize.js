require('dotenv').config();
const Sequelize = require('sequelize');


let sequelize;

// REACT_APP_BACKENDNODE_URL=http://localhost:3001
// DB_URL=mysql://root:@localhost:3306/internship_system
const dbUrl = process.env.DB_URL;
// console.log('DB URL:', dbUrl);


if (dbUrl) {
    const regex = /mysql:\/\/([^:]+)(?::([^@]*))?@([^:]+):(\d+)\/([^?]+)/;
    const match = dbUrl.match(regex);

    if (match) {
        sequelize = new Sequelize(match[5], match[1], match[2], {
            host: match[3],
            dialect: 'mysql',
            logging: false
        });
    } else {
        console.error('Invalid DB URL format');
    }
} else {
    console.error('DB URL is not set');
}

module.exports = sequelize;