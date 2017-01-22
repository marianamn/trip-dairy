/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('User', {
    username: {
        type: String,
        unique: true
    },
    salt: String,
    hashPass: String,
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profileImgURL: {
        type: String
    },
    email: {
        type: String
    },
    recipes: [],
    forumPoints: {
        type: Number,
        default: 0
    },
    isAdmin: Boolean
})