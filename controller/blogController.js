const db = require("../models/index.js")

const Blog = db.blogs
// const Op = db.Sequelize.Op


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.content || !req.body.image) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a blog
    const blog = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    };

    // Save blog in the database
    Blog.create(blog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the blog."
            });
        });
};

exports.findAll = (req, res) => {
    Blog.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Blogs."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Blog.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Bog was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with Title=${title}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with title=" + title
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Blog.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Blog was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Blog was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with title=" + title
            });
        });
};
