module.exports = (connection, Sequelize) => {
    const User = connection.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.TEXT
        }
    });
    User.sync();

    return User;
};