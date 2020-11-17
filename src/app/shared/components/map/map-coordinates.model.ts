export class MapCoordinates {
    longitude = 0;
    latitude = 0;
    draggable = true;
    editEnabled = false;
    useGeolocation = false;
    markerInfo: MarkerInfo;
}

export class MarkerInfo {
    name: string;
    active = false;
    id: string | number;
    organisationId: number;
}
