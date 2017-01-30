/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("User", {
    username: {
        type: String,
        unique: true
    },
    salt: String,
    hashPass: String,
    firstName: {
        type: String,
        required: requiredMessage
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    profileImgURL: {
        type: String
    },
    diaries: [],
    isAdmin: Boolean,
    facebookId: String
});