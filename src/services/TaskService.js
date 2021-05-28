const { Task, Board } = require('../models/mongoose');

const create = async(document) => {
    const task = await new Task(document).save();
    await Board.findByIdAndUpdate(task.board, { $push: { tasks: task.id } });
    return task;
};

const read = async(id) => {
    return await Task.findById(id).exec();
}

const readAll = async() => {
    return await Task.find().populate('board').exec();
}

const update = async(id, fields) => {
    const document = await Task.findById(id).exec();
    const newDocument = {
        ...document.toObject(),
        ...fields,
    };
    document.set(newDocument);
    await document.save();
    return document;
}

const remove = async(id) => {
    const response = await Task.findByIdAndDelete(id).exec();
    return response !== null;
}

const clearCompleted = async() => {
    const response = await Task.deleteMany({ completed: true });
    return response !== null;
}

module.exports = {
    create,
    read,
    readAll,
    update,
    remove,
    clearCompleted,
}