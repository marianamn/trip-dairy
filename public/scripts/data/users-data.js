import CryptoJS from "cryptojs";
import { UTILS } from "utils";
import { requester } from "requester";

// function encryptToSha1(string) {
//     let toSha1 = CryptoJS.SHA1(string).toString();

//     return toSha1;
// }

class UsersData {
    constructor(urls, options) {
        this.urls = urls;
        this.options = options;
        this.requester = requester;
    }

    register(newUser) {
        let postBody = {
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            profileImgURL: newUser.profileImgURL,
            password: newUser.password,
            facebookContact: newUser.facebookContact,
            youTubeContact: newUser.youTubeContact,
            twitterContact: newUser.twitterContact,
            googlePlusContact: newUser.googlePlusContact,
            instagramContact: newUser.instagramContact,
            rssContact: newUser.rssContact
        };

        let url = this.urls.getRegisterUrl();
        let body = { body: JSON.stringify(postBody) };

        return this.requester.postJSON(url, body, {});
    }

    login(logUser) {
        let body = {
            body: JSON.stringify({
                email: logUser.email,
                password: logUser.password
            })
        };

        let url = this.urls.getLoginUrl();

        return this.requester.postJSON(url, body, {});
    }

    logout() {
        return new Promise((resolve) => {
            resolve();
        });
    }

    getAllUsers() {
        let url = this.urls.getAllUsersURL();

        return this.requester.getJSON(url, {});
    }

    getUserById(id) {
        let url = this.urls.getUserByIdUrl(id);

        return this.requester.getJSON(url, {});
    }
}

let usersData = new UsersData(UTILS.URLS, requester);
export { usersData };