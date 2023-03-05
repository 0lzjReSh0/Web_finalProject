const mongoose = require('mongoose');
// create a mongoose model named Comment, 
//used to store the users' comments and information
const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    }
});
//Create the comment model in mongoose
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
