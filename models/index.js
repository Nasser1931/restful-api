const dbconfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbConfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.logins = require("./loginModel.js")(sequelize, Sequelize);
db.blogs = require("./blogModel.js")(sequelize, Sequelize);

module.exports = db;