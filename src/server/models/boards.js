const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardsSchema = new Schema({
    id: {
        type: String,
        required: true,

    },
    board_name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    }
},
    {
        collection: "scrumboards_board"
    });
module.exports = mongoose.model('BoardsSchema', BoardsSchema)