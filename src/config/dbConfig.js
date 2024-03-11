const path = require('path');
const configs = require('./config');
const { User, UserProfile, userAdmin, Event } = require('../models/index');

// const userProfile = require('../models/userProfile.model.js');
// const userAdmin = require('../models/userAdmin.model.js');

// configuration file for TypeORM db connection

module.exports = {
  type: 'mysql', // Change the type to mysql
  host: configs.mysql.host, // Use MySQL host configuration
  port: configs.mysql.port, // Use MySQL port configuration
  username: configs.mysql.userName, // Use MySQL username configuration
  password: configs.mysql.password, // Use MySQL password configuration
  database: configs.mysql.database, // Use MySQL database configuration
  // entities: [__dirname + "/../models/*.js"],
  entities: [User, UserProfile, userAdmin, Event],

  synchronize: false,
  // migrationsRun: true,
  migrations: [path.join(__dirname, '../migrations/*.js')], // Path to migration files
  cli: {
    entitiesDir: path.join(__dirname, '../models'),
    migrationsDir: path.join(__dirname, '../migrations*.js'),
  },
  extra: {
    connectionLimit: configs.mysql.maxConn, // Set the pool size to MySQL configuration
    idleTimeoutMillis: configs.mysql.idleTimeOut,
    connectionTimeoutMillis: configs.mysql.connTimeOut,
  },
};
