/* globals module */

const dataUtils = require("./utils/data-utils");

module.exports = function(models) {
    let { User } = models;

    return {
        createUser(user) {
            return new Promise((resolve, reject) => {
                    let newUser = new User({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImgURL: user.profileImgURL,
                        salt: user.salt,
                        hashPass: user.hashPass,
                        userInfo: user.userInfo,
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
        getUserByEmail(email) {
            return new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return dataUtils.getAll(User);
        },
        getUserById(id) {
            return dataUtils.getOneById(User, id);
        }
    };
};