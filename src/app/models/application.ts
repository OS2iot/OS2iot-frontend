export interface ApplicationDevices {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface Application {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    iotDevices: ApplicationDevices[];
}
