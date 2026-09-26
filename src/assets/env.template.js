// Variables in this file will be substituted using envsubst
(function (window) {
  window["env"] = window["env"] || {};
  window["env"].PRODUCTION = "${PRODUCTION}";
  window["env"].BASE_URL = "${BASE_URL}";
  window["env"].TABLE_PAGE_SIZE = "${TABLE_PAGE_SIZE}";
  window["env"].DAF_USERNAME = "${DAF_USERNAME}";
  window["env"].DAF_PASSWORD = "${DAF_PASSWORD}";
  window["env"].ENABLE_KOMBIT = "${ENABLE_KOMBIT}";
})(this);
