/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("User", {
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    profileImgURL: {
        type: String,
        required: true
    },
    salt: String,
    hashPass: String,
    facebookContact: String,
    youTubeContact: String,
    twitterContact: String,
    googlePlusContact: String,
    instagramContact: String,
    rssContact: String
});