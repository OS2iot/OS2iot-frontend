import { Injectable } from '@angular/core';
import { Alert } from 'src/app/models/alert';

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