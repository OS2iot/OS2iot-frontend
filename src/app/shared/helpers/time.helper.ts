import { GrpcTime } from '@app/gateway/gateway.model';

export const convertToDateFromTimestamp = (time: GrpcTime): string => {
    const totalMilliseconds = time.seconds * 1000 + time.nanos / 1e6;
    const date = new Date(totalMilliseconds).toISOString();
    return date;
};
