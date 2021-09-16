const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }]
}, { timestamp: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;