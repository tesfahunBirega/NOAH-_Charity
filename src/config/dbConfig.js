const configs = require('./config');
const Post = require('../models/user.model.js');
// configuration file for TypeORM db connection

module.exports = {
  type: 'mysql', // Change the type to mysql
  host: configs.mysql.host, // Use MySQL host configuration
  port: configs.mysql.port, // Use MySQL port configuration
  username: configs.mysql.userName, // Use MySQL username configuration
  password: configs.mysql.pswd, // Use MySQL password configuration
  database: configs.mysql.database, // Use MySQL database configuration
  // entities: [__dirname + "/../models/*.js"],
  entities: [Post],

  synchronize: configs.env === 'development' ? true : true,
  migrations: [__dirname + '/migrations/*.js'], // Path to migration files
  cli: {
    entitiesDir: __dirname + '/models/*.js',
    migrationsDir: __dirname + '/migrations',
  },
  extra: {
    connectionLimit: configs.mysql.maxConn, // Set the pool size to MySQL configuration
    idleTimeoutMillis: configs.mysql.idleTimeOut,
    connectionTimeoutMillis: configs.mysql.connTimeOut,
  },
};
