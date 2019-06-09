const path = require("path");
const Sequelize = require("sequelize");

const users = require("../models/User");
const posts = require("../models/Post");

const connection = new Sequelize("sql2294719", "sql2294719", "gJ1*vH5*", {
    host: "sql2.freemysqlhosting.net",
    dialect: "mysql",
    define: {
        charset: 'utf8mb4',
    }
});

const db = {};

db.connection = connection;
db.User = users(connection, Sequelize);
db.Post = posts(connection, Sequelize);

db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id", onDelete: "cascade" });

module.exports = db;