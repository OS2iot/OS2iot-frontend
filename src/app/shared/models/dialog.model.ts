export class DialogModel {
  infoTitle: string;
  showOk = true;
  showAccept = true;
  showCancel = true;
  showReject: boolean;
  message: string;
  acceptText: string;
  cancelText: string;
}

export class WelcomeDialogModel {
  hasSomePermission: boolean;
}

export class ApplicationDialogModel {
  applicationId: number;
  organizationId?: number;
}

export class GatewayDialogModel {
  gatewayDbId: number;
  organizationId?: number;
}

export class IoTDeviceApplicationDialogModel {
  deviceId: number;
}
