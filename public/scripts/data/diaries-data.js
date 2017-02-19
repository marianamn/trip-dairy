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
}

let tripsDiariesData = new TripsDiariesData(UTILS.URLS);

export { tripsDiariesData };