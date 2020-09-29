export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
    message: string;
    type: AlertType;
}
