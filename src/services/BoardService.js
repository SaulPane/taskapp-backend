const { Board } = require('../models/mongoose');

const create = async(document) => {
    return await new Board(document).save();
};

const read = async(id) => {
    return await Board.findById(id).populate('tasks').exec();
}

const readAll = async() => {
    return await Board.find().populate('tasks').exec();
}

const update = async(id, fields) => {
    const document = await Board.findById(id).exec();
    const newDocument = {
        ...document.toObject(),
        ...fields,
    };
    document.set(newDocument);
    await document.save();
    return document;
}

const remove = async(id) => {
    const response = await Board.findByIdAndDelete(id).exec();
    return response !== null;
}


module.exports = {
    create,
    read,
    readAll,
    update,
    remove,
}