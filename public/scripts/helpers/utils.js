/* globals localStorage*/

import _ from "underscore";
import tinymce from "tinymce";

function getRecentTripsDiaries(trips, count, charsCount) {
    let tripsData,
        recentTripDiaries;

    recentTripDiaries = trips.sort((a, b) => {
        return new Date(b.postDate) - new Date(a.postDate);
    });

    tripsData = recentTripDiaries.slice(0, count);

    for (let i = 0; i < tripsData.length; i++) {
        tripsData[i].content = recentTripDiaries[i].content.substring(0, charsCount);
    }

    return tripsData;
}

function getMostLikedTripsDiaries(trips, count) {
    let tripsData,
        mostLikedTripDiaries,
        topLikedDieries,
        num = 0;

    mostLikedTripDiaries = trips.sort((a, b) => {
        return parseFloat(b.likes) - parseFloat(a.likes);
    });

    topLikedDieries = mostLikedTripDiaries.slice(0, count);

    tripsData = _.map(topLikedDieries, (value) => {
        return {
            number: ++num,
            tripsGrouped: value
        };
    });

    return tripsData;
}

function getCategories(trips) {
    let tripsData,
        groupedByCategory;

    groupedByCategory = _.groupBy(trips, (trip) => {
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

function getUserFullName(users, email) {
    let fullName;

    users.forEach((user) => {

        if (user.email === email) {
            fullName = `${user.firstName} ${user.lastName}`;
        }
    });

    return fullName;
}

function tinyMceInit() {
    tinymce.init({
        selector: "#tb-content",
        height: 300,
        menubar: false,
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste code"
        ],
        toolbar: "undo redo  | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent",
        content_css: "https://www.tinymce.com/css/codepen.min.css"
    });
}

function getRegisterUrl() {
    return "/auth/register";
}

function getLoginUrl() {
    return "/auth/login";
}

function getLogoutUrl() {
    return "/auth/logout";
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

function getDiaryAddUrlUrl() {
    return "/api/add-diary";
}


let HELPER_FUNCTIONS = {
    getRecentTripsDiaries: getRecentTripsDiaries,
    getMostLikedTripsDiaries: getMostLikedTripsDiaries,
    getCategories: getCategories,
    tripDiariesByCategory: tripDiariesByCategory,
    getTripsByAuthor: getTripsByAuthor,
    getUserInfo: getUserInfo,
    getUserFullName: getUserFullName,
    tinyMceInit: tinyMceInit
};

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllUsersURL: getAllUsersURL,
    getAllTripsUrl: getAllTripsUrl,
    getTripByIdUrl: getTripByIdUrl,
    getUserByIdUrl: getUserByIdUrl,
    getLogoutUrl: getLogoutUrl,
    getDiaryAddUrlUrl: getDiaryAddUrlUrl
};

let utils = {
    URLS: URLS,
    HELPER_FUNCTIONS: HELPER_FUNCTIONS
};

export { utils as UTILS };