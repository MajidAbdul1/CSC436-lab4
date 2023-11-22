const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = ""; // Enter your private key

router.use(function (req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
                algorithms: ["RS256"], // Ensure the algorithm matches
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

// Creating a new Todo
router.post("/", async function (req, res) {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,
    });
    await todo
        .save()
        .then((savedTodo) => {
            return res.status(201).json(savedTodo);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

// Retrieving a user’s Todos
// Assuming you are using the fetch API or axios for making HTTP requests
router.get("/", async function (req, res) {
    const todos = await Todo.find().where("author").equals(req.payload.id).exec();
    return res.status(200).json({ todos });
});

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json({ message: "Todo deleted successfully" });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});


// Updating a Todo
router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const updateData = req.body;
    await Todo.findByIdAndUpdate(id, updateData, { new: true })
        .then((updatedTodo) => {
            return res.status(200).json(updatedTodo);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

module.exports = router;