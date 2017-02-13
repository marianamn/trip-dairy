import { requester } from "requester";
const allTripsUrl = "/api/trip-diaries";

// TODO: constructor(url, options, requester)
class TripsDiariesData {
    constructor(url) {
        this.url = url;
        this.requester = requester;
    }

    getAllTripsDiaries() {
        return this.requester.getJSON(this.url, {});
    }
}

let tripsDiariesData = new TripsDiariesData(allTripsUrl);

export { tripsDiariesData };