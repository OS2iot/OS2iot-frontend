export class CommonLocation {
    longitude: number = 0;
    latitude: number = 0;
    altitude: number = 0;
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