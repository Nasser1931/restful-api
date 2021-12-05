const { response } = require("express");
const db = require("../models/index.js")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
var cookieParser = require('cookie-parser');
const Login = db.logins
const JWT_SECRET = process.env.JWT



module.exports = app => {
    const login = require("../controller/loginController.js");
    var router = require("express").Router();

    const verifyUserLogin = async (username, password) => {
        try {
            const user = await Login.findOne({ where: { username: username } })

            if (!user) {
                return { status: 'error', error: 'user not found' }
            }

            if (await bcrypt.compare(password, JSON.parse(JSON.stringify(user.password)))) {
                // creating a JWT token
                token = jwt.sign({ id: user._id, username: user.username, type: 'user' }, JWT_SECRET, { expiresIn: '2h' })
                return { status: 'ok', data: token }
            }
            return { status: 'error', error: 'invalid password' }
        } catch (error) {
            console.log(error);
            return { status: 'error', error: 'timed out' }
        }
    }
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        // we made a function to verify our user login
        const response = await verifyUserLogin(username, password);
        if (response.status === 'ok') {
            // storing our JWT web token as a cookie in our browser
            res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
            res.redirect('/blog');
        } else {
            res.json(response);
        }
    })
    router.post("/login/create", login.create);
    router.get("/", login.findAll);
    app.use('/login', router);
};