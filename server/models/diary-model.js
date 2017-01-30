/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Diary", {
    title: {
        type: String,
        unique: true
    },
    author: {
        type: String
    },
    place: {
        type: String
    },
    category: {
        type: String
    },
    content: {
        type: String
    },
    postDate: {
        type: Date
    },
    images: [],
    comments: [{
        body: String,
        postDate: Date
    }],
    likes: Number,
    dislikes: Number
});