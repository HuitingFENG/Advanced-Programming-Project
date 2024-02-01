require('dotenv').config();
const url = require('url');

// Parse the database URL from the environment variable
const dbUrl = process.env.DB_URL;
const parsedUrl = new url.URL(dbUrl);

module.exports = {
  development: {
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.slice(1),
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    dialect: 'mysql',
  },
  test: {
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.slice(1),
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    dialect: 'mysql',
  },
  production: {
    username: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.slice(1),
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    dialect: 'mysql',
  }
};
