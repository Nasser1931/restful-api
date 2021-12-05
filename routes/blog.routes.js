module.exports = app => {
    const blogs = require("../controller/blogController.js");

    var router = require("express").Router();

    router.post("/", blogs.create);

    // Retrieve all Tutorials
    router.get("/", blogs.findAll);
    router.put("/:id", blogs.update);

    // Delete a Tutorial with id
    router.delete("/:id", blogs.delete);
    app.use('/blog', router);
}