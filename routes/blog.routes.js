module.exports = app => {
    const blogs = require("../controller/blogController.js");

    var router = require("express").Router();

    router.post("/", blogs.create);

    // Retrieve all blogs
    router.get("/", blogs.findAll);
    router.put("/:id", blogs.update);

    // Delete a Blog with id
    router.delete("/:id", blogs.delete);
    app.use('/blog', router);
}
