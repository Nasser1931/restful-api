module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Blog;
};