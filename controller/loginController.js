const db = require("../models/index.js")
const bcrypt = require("bcrypt");
const Login = db.logins
// const Op = db.Sequelize.Op


exports.create = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Username or Passowrd Required"
        });
        return
    }


    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = {
            username: req.body.username,
            password: hash
        }
        Login.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {

                res.status(500).send({
                    message:
                        err.message || "╡∞"
                });
            })

    });
    return { status: 'ok' }

}

exports.findAll = (req, res) => {
    Login.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

