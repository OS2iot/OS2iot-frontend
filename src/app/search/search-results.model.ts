export class SearchResultDto {
    id: number | string;

    createdAt: Date;

    updatedAt: Date;

    name: string;

    type: SearchResultType;

    applicationId?: number;
    organizationId?: number;
    organizationName?: string;

    deviceId?: string;
    deviceEUI?: string;
    apiKey?: string;
    gatewayId?: string;
    deviceType?: string;
}

export enum SearchResultType {
    Gateway = "Gateway",
    IoTDevice = "IoTDevice",
    Application = "Application",
}

export class ListAllSearchResultsResponseDto {
    data: SearchResultDto[];
    count: number;
}
