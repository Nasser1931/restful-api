module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Login;
};