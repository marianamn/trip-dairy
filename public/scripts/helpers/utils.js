function getRegisterUrl() {
    return "/auth/register";
}

function getLoginUrl() {
    return "/auth/login";
}

function getAllTripsUrl() {
    return "/api/trip-diaries";
}

function getTripByIdUrl(itemId) {
    return `/api/trip-diaries/${itemId}`;
}

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllTripsUrl: getAllTripsUrl,
    getTripByIdUrl: getTripByIdUrl
};

let utils = {
    URLS: URLS
};

export { utils as UTILS };