// "env" is defined in env.js and facilitates dynamic configurations using environment variables
export const environment = {
  production: window["env"].PRODUCTION === "true",
  baseUrl: window["env"].BASE_URL || "http://localhost:3000/api/v1/",
  tablePageSize: parseInt(window["env"].TABLE_PAGE_SIZE) || 25,
  dafusername: window["env"].DAF_USERNAME || "",
  dafpassword: window["env"].DAF_PASSWORD || "",
  enableKombit: window["env"].ENABLE_KOMBIT !== "false" && window["env"].ENABLE_KOMBIT !== false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
