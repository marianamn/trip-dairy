/* globals localStorage*/

import { UTILS } from "utils";
import { requester } from "requester";


class TripsDiariesData {
    constructor(urls) {
        this.urls = urls;
        this.requester = requester;
    }

    getAllTripsDiaries() {
        let url = this.urls.getAllTripsUrl();

        return this.requester.getJSON(url, {});
    }

    getTripDiaryById(id) {
        let url = this.urls.getTripByIdUrl(id);

        return this.requester.getJSON(url, {});
    }

    addDiary(diary) {
        let postBody = {
            title: diary.title,
            author: diary.author,
            place: diary.place,
            category: diary.category,
            content: diary.content,
            postDate: diary.postDate,
            mainImage: diary.mainImage,
            images: diary.images
        };

        let url = this.urls.getDiaryAddUrlUrl();
        let body = { body: JSON.stringify(postBody) };

        let options = {
            headers: {
                "x-auth-key": localStorage.getItem("auth_key")
            }
        };

        return this.requester.postJSON(url, body, options);
    }

    addComment(comment) {
        let postBody = {
            diaryId: comment.diaryId,
            author: comment.author,
            profileImgURL: comment.profileImgURL,
            body: comment.body,
            postDate: comment.postDate
        };

        let url = this.urls.getAddCommentUrl(comment.diaryId);
        let body = { body: JSON.stringify(postBody) };

        return this.requester.putJSON(url, body, {});
    }
}

let tripsDiariesData = new TripsDiariesData(UTILS.URLS);

export { tripsDiariesData };