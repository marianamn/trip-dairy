import _ from "underscore";
import tinymce from "tinymce";

function transformDate(date) {
    let months = [];

    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    let month = date.getMonth();
    let m = months[month];
    let d = date.getDate();
    let y = date.getFullYear();

    let day = `${m} ${d} ${y}`;

    return day;
}

function getDate(date) {
    let day = date.getDate();

    return day;
}


function getMonth(date) {
    let months = [];

    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    let m = date.getMonth();
    let month = months[m];

    return month;
}

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

    let tripsData1 = _.map(tripsData, (value) => {
        return {
            tripsData: value,
            date: transformDate(new Date(value.postDate))
        };
    });

    return tripsData1;
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
            tripsGrouped: _.map(value, (trip) => {
                return {
                    tripsData: trip,
                    date: transformDate(new Date(trip.postDate))
                };
            })
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

function getNextAndPreviousDiary(diaries, id) {
    let sorted = _.sortBy(diaries, (trip) => {
        return trip._id;
    });

    let sortedById = _.toArray(sorted);

    let prev,
        next;

    for (let i = 0; i < sortedById.length; i++) {
        if (sortedById[i]._id === id) {
            if (i - 1 >= 0) {
                prev = sortedById[i - 1];
            } else {
                prev = sortedById[sortedById.length - 1];
            }

            if (i + 1 < sortedById.length) {
                next = sortedById[i + 1];
            } else {
                prev = sortedById[0];
            }
        }
    }

    let tripsPrevAndNext = {
        prev: prev,
        next: next
    };

    return tripsPrevAndNext;
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

function filterByName(array, searchWord) {
    var len = array.length;
    for (var i = 0; i < len; i += 1) {
        var $currentItem = $(array[i]);
        if ($currentItem.html().toLowerCase().indexOf(searchWord.toLowerCase()) < 0) {
            $currentItem.parent().parent().addClass('filter');
        } else {
            $currentItem.parent().parent().removeClass('filter');
        }
    }
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
    tinyMceInit: tinyMceInit,
    transformDate: transformDate,
    getDate: getDate,
    getMonth: getMonth,
    filterByName: filterByName,
    getNextAndPreviousDiary: getNextAndPreviousDiary
};

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllUsersURL: getAllUsersURL,
    getAllTripsUrl: getAllTripsUrl,
    getTripByIdUrl: getTripByIdUrl,
    getUserByIdUrl: getUserByIdUrl,
    getDiaryAddUrlUrl: getDiaryAddUrlUrl
};

let utils = {
    URLS: URLS,
    HELPER_FUNCTIONS: HELPER_FUNCTIONS
};

export { utils as UTILS };