/* globals localStorage*/

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
    let tripsData,
        sortByAuthor,
        groupedByAuthor;

    sortByAuthor = _.sortBy(trips.data, (trip) => {
        return trip.author;
    });

    groupedByAuthor = _.groupBy(sortByAuthor, (trip) => {
        return trip.author;
    });

    tripsData = _.map(groupedByAuthor, (value, key) => {
        return {
            author: key,
            tripsGrouped: value
        };
    });

    return tripsData;
}

function getUserInfo(users, name) {
    let foundUser;

    users.forEach((user) => {
        let fullName = `${user.firstName} ${user.lastName}`;

        if (fullName === name) {
            foundUser = user;
        }
    });

    return foundUser;
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

function getUserByIdUrl(userId) {
    return `/auth/users/${userId}`;
}


let HELPER_FUNCTIONS = {
    getRecentTripsDiaries: getRecentTripsDiaries,
    getCategories: getCategories,
    tripDiariesByCategory: tripDiariesByCategory,
    getTripsByAuthor: getTripsByAuthor,
    getUserInfo: getUserInfo
};

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllUsersURL: getAllUsersURL,
    getAllTripsUrl: getAllTripsUrl,
    getTripByIdUrl: getTripByIdUrl,
    getUserByIdUrl: getUserByIdUrl
};

let utils = {
    URLS: URLS,
    HELPER_FUNCTIONS: HELPER_FUNCTIONS
};

export { utils as UTILS };