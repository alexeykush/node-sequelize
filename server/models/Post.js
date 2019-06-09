module.exports = (connection, Sequelize) => {
    const Post = connection.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Post.sync();
    return Post;
};