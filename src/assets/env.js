// This file will be overwritten when running in Docker using env.template.js and envsubst
(function (window) {
    window["env"] = window["env"] || {};
    window["env"].PRODUCTION = false;
    window["env"].BASE_URL = "http://localhost:3000/api/v1/"; // For local testing
    window["env"].TABLE_PAGE_SIZE = 25; // For local testing
    window["env"].DAF_USERNAME = "";
    window["env"].DAF_PASSWORD = "";
})(this);
