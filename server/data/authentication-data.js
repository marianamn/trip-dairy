/* globals module */

const dataUtils = require("./utils/data-utils");

module.exports = function(models, validator) {
    let { User } = models;

    return {
        createUser(user) {
            return new Promise((resolve, reject) => {
                    // if (!validator.validateStringLength(user.firstName, 3, 50)) {
                    //     return reject("Error: First name must be between 3 and 50 symbols");
                    // }
                    // if (!validator.validateIsStringValid(user.firstName)) {
                    //     return reject("First name fail");
                    // }

                    // if (!validator.validateStringLength(user.lastName, 3, 50)) {
                    //     return reject("Error: Last name must be between 3 and 50 symbols");
                    // }

                    // if (!validator.validateIsStringValid(user.lastName)) {
                    //     return reject("Last name fail");
                    // }

                    // if (user.profileImgURL && !validator.validateImageUrl(user.profileImgURL)) {
                    //     return reject("Invalid image url");
                    // }

                    // if (!user.salt) {
                    //     return reject("Salt must exists");
                    // }

                    // if (!user.hashPass) {
                    //     return reject("Hash pass must exists");
                    // }

                    let newUser = new User({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImgURL: user.profileImgURL,
                        salt: user.salt,
                        hashPass: user.hashPass,
                        facebookContact: user.facebookContact,
                        youTubeContact: user.youTubeContact,
                        twitterContact: user.twitterContact,
                        googlePlusContact: user.googlePlusContact,
                        instagramContact: user.instagramContact,
                        rssContact: user.rssContact
                    });

                    resolve(newUser);
                })
                .then((newUser) => {
                    return dataUtils.save(newUser);
                });
        },
        getUserByName(firstName, lastName) {
            return new Promise((resolve, reject) => {
                let fullName = `${firstName} ${lastName}`;

                User.findOne({ fullName }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find()
                    .exec({}, (err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });
        }
    };
};