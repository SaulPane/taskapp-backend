const { Router } = require('express');
const { validateTask } = require('../models/mongoose');
const TaskService = require('../services/TaskService');
const validate = require("../middlewares/validate")
const protect = require('../middlewares/protect');

const router = Router();

router.use(protect);

router.get("", async(req, res) => {
    const tasks = await TaskService.readAll();
    return res.status(200).json(tasks);
});

router.get("/:id", async(req, res) => {
    const task = await TaskService.read(req.params.id);
    return res.status(200).json(task);
});

router.post("", validate(validateTask), async(req, res) => {
    const body = req.body;
    const task = await TaskService.create(body);
    return res.status(201).json(task)
});

router.put("/:id", validate(validateTask), async(req, res) => {
    const body = req.body;
    const { id } = req.params
    const task = await TaskService.update(id, body);
    return res.status(200).json(task)
});

router.patch("/:id", validate(validateTask), async(req, res) => {
    const body = req.body;
    const { id } = req.params
    const task = await TaskService.update(id, body);
    return res.status(200).json(task)
});

router.delete("/:id", async(req, res) => {
    const { id } = req.params
    const deleted = await TaskService.remove(id);
    return res.status(200).json(deleted)
});

router.post('/clear', async(req, res) => {
    const deleted = await TaskService.clearCompleted();
    return res.status(200).json(deleted)
})


module.exports = router;