import _ from "underscore";

function getRecentTripsDiaries(trips, count, charsCount) {
    let tripsData,
        recentTripDiaries;

    recentTripDiaries = trips.data.sort((a, b) => {
        return new Date(b.postDate) - new Date(a.postDate);
    });

    tripsData = recentTripDiaries.slice(0, count);

    for (let i = 0; i < tripsData.length; i++) {
        tripsData[i].content = recentTripDiaries[i].content.substring(0, charsCount);
    }

    return tripsData;
}

function getCategories(trips) {
    let tripsData,
        groupedByCategory;

    groupedByCategory = _.groupBy(trips.data, (trip) => {
        return trip.category;
    });

    tripsData = _.map(groupedByCategory, (value, key) => {
        return {
            category: key,
            tripsGrouped: value
        };
    });

    return tripsData;
}

function tripDiariesByCategory(trips, category) {
    let tripsData;

    tripsData = _.where(trips.data, { category: category });

    return tripsData;
}

function getTripsByAuthor(trips) {
    let tripsData;

    _.sortBy(trips.data, trips.author);
    _.groupBy(trips.data, (trip) => {
        return trip.author;
    });
    return tripsData;
}

function getRegisterUrl() {
    return "/auth/register";
}

function getLoginUrl() {
    return "/auth/login";
}

function getAllUsersURL() {
    return "/auth/users";
}

function getAllTripsUrl() {
    return "/api/trip-diaries";
}

function getTripByIdUrl(itemId) {
    return `/api/trip-diaries/${itemId}`;
}

let HELPER_FUNCTIONS = {
    getRecentTripsDiaries: getRecentTripsDiaries,
    getCategories: getCategories,
    tripDiariesByCategory: tripDiariesByCategory
};

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllUsersURL: getAllUsersURL,
    getAllTripsUrl: getAllTripsUrl,
    getTripByIdUrl: getTripByIdUrl
};

let utils = {
    URLS: URLS,
    HELPER_FUNCTIONS: HELPER_FUNCTIONS
};

export { utils as UTILS };