const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let nextId = 1;

// Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = { id: nextId++, title, description, dueDate };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Retrieve a single task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
