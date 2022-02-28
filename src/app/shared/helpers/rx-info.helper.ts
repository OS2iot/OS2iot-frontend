import { nameof } from './type.helper';

export interface RxInfo {
  name: string;
  rssi: number;
  time: string;
  loRaSNR: number;
  location: {
    altitude: number;
    latitude: number;
    longitude: number;
  };
  uplinkID: string;
  gatewayID: string;
}

export const isValidRssiInfo = (rssiInfo: unknown): rssiInfo is RxInfo[] => {
  return (
    Array.isArray(rssiInfo) &&
    nameof<RxInfo>('rssi') in rssiInfo[0] &&
    nameof<RxInfo>('loRaSNR') in rssiInfo[0]
  );
};
