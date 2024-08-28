export class CommonLocation {
    longitude = 11.764445;
    latitude = 55.959443;
    altitude = 0;
    source?:
        | "UNKNOWN"
        | "GPS"
        | "CONFIG"
        | "GEO_RESOLVER_TDOA"
        | "GEO_RESOLVER_RSSI"
        | "GEO_RESOLVER_GNSS"
        | "GEO_RESOLVER_WIFI";
    accuracy?: number;
}
