export class CommonLocation {
    longitude = 0;
    latitude = 0;
    altitude = 0;
    source?:
        | 'UNKNOWN'
        | 'GPS'
        | 'CONFIG'
        | 'GEO_RESOLVER_TDOA'
        | 'GEO_RESOLVER_RSSI'
        | 'GEO_RESOLVER_GNSS'
        | 'GEO_RESOLVER_WIFI';
    accuracy?: number;
}
