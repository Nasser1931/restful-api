const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const db = require("./models/index.js");
db.sequelize.sync();


app.get('/', (req, res) => {
    res.send('hello world!!!');
});

require("./routes/login.routes.js")(app);
require("./routes/blog.routes.js")(app);

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if (verify.type === 'user') { return true; }
        else { return false };
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        return false;
    }
}


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});