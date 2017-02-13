import CryptoJS from "cryptojs";
import { requester } from "requester";
const registerUrl = "/auth/register";

// function encryptToSha1(string) {
//     let toSha1 = CryptoJS.SHA1(string).toString();

//     return toSha1;
// }

class UsersData {
    constructor(url, options) {
        this.url = url;
        this.options = options;
        this.requester = requester;
    }

    register(newUser) {
        let postBody = {
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

        let body = { body: JSON.stringify(postBody) };

        return this.requester.postJSON(this.url, body, {});
    }
}

let usersData = new UsersData(registerUrl, requester);
export { usersData };