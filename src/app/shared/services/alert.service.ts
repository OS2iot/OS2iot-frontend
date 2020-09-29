import { Injectable } from '@angular/core';
import { Alert } from '@shared/models/alert.model';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: Alert[] = [];

  add(alert: Alert) {
    this.alerts.push(alert);
  }

  clear() {
    this.alerts = [];
  }
}