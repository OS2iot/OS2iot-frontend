export class DialogModel {
  infoTitle: string;
  showOk = true;
  showAccept = true;
  showCancel = true;
  message: string;
  acceptText: string;
  cancelText: string;
}

export class WelcomeDialogModel {
  hasSomePermission: boolean;
}
