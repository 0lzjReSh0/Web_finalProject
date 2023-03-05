const mongoose = require('mongoose');
// create a mongoose model named Post, 
//used to store the users' posts and information
const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false

    },
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    language:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        default: []
    }
});
//Create the post model in mongoose
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;