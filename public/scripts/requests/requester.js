import $ from "jquery";

class Requester {

    get(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    putJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            let headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    postJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            let headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    getJSON(url, options) {
        let promise = new Promise((resolve, reject) => {
            let headers = options.headers || {};
            $.ajax({
                url,
                method: "GET",
                headers: headers,
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }
}

let requester = new Requester();
export { requester };