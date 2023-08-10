require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'portfolio_dev',
    host: process.env.HOSTNAME,
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'portfolio_test',
    host: process.env.HOSTNAME,
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'portfolio_prod',
    host: process.env.HOSTNAME,
    dialect: 'mysql'
  }
}
