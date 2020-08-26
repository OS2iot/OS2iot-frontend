export class CommonLocation {
    longitude?: number;
    latitude?: number;
    altitude?: number;
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