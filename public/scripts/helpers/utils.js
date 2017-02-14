function getRegisterUrl() {
    return "/auth/register";
}

function getLoginUrl() {
    return "/auth/login";
}

function getAllTripsUrl() {
    return "/api/trip-diaries";
}

let URLS = {
    getRegisterUrl: getRegisterUrl,
    getLoginUrl: getLoginUrl,
    getAllTripsUrl: getAllTripsUrl
};

let utils = {
    URLS: URLS
};

export { utils as UTILS };