const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

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

const handleDelete = async () => {
    try {
        const response = await fetch(`/todo/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${state.user.access_token}`
            },
        });

        if (response.ok) {
            // If the server returns a successful response (status code 200), update the UI
            dispatch({ type: 'DELETE_TODO', _id });
        } else {
            // If the server returns an error response, handle it accordingly
            const errorData = await response.json();
            console.error('Error deleting todo:', errorData.error);
        }
    } catch (error) {
        // Handle other errors, such as network issues
        console.error('Error deleting todo:', error.message);
    }
};


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