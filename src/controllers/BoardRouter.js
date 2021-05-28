const { Router } = require('express');
const { validateBoard } = require('../models/mongoose');
const BoardService = require('../services/BoardService');
const validate = require("../middlewares/validate")
const protect = require('../middlewares/protect');

const router = Router();

router.use(protect);

router.get("", async (req, res) => {
    const boards = await BoardService.readAll();
    return res.status(200).json(boards);
});

router.get("/:id", async (req, res) => {
    const board = await BoardService.read(req.params.id);
    return res.status(200).json(board);
});

router.post("", validate(validateBoard), async (req, res) => {
    const body  = req.body;
    const board = await BoardService.create(body);
    return res.status(201).json(board)
});

router.put("/:id", validate(validateBoard), async (req, res) => {
    const body  = req.body;
    const { id } = req.params
    const board = await BoardService.update(id, body);
    return res.status(200).json(board)
});

router.patch("/:id", validate(validateBoard), async (req, res) => {
    const body  = req.body;
    const { id } = req.params
    const board = await BoardService.update(id, body);
    return res.status(200).json(board)
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deleted = await BoardService.remove(id);
    return res.status(200).json(deleted)
});


module.exports = router;