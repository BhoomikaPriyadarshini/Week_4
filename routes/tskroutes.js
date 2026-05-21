const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// Add task
router.post("/add", async function(req, res) {
    try {
        const newTask = new Task({
            taskName: req.body.taskName,
            status: req.body.status,
            date: req.body.date
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: "Error adding task" });
    }
});

// Get all tasks
router.get("/", async function(req, res) {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error getting tasks" });
    }
});

// Delete task
router.delete("/delete/:id", async function(req, res) {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});

// Edit task
router.put("/edit/:id", async function(req, res) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                taskName: req.body.taskName,
                status: req.body.status,
                date: req.body.date
            },
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});

// Mark task as complete
router.put("/complete/:id", async function(req, res) {
    try {
        const completedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: "Completed"
            },
            { new: true }
        );

        res.status(200).json(completedTask);
    } catch (error) {
        res.status(500).json({ message: "Error marking task as complete" });
    }
});

module.exports = router;
