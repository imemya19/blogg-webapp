const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'OnModel',
        required: true
    },

    onModel:{
        type:String,
        required: true,
        enum:['Post,Comment']
    }
}, { timestamp: true });

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;