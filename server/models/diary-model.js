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
    mainImage: String,
    images: [],
    comments: [{
        author: String,
        body: String,
        postDate: Date,
        profileImgURL: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});