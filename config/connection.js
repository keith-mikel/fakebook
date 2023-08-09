const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSBD_URL);
} else {
  sequelize = new Sequelize(
    sequelize.env.DB_NAME,
    sequelize.env.DB_USER,
    sequelize.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;