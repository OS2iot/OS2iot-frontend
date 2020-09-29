import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Gateway } from 'src/app/models/gateway';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import 'moment/locale/da';

@Component({
  selector: 'tr[app-gateway-table-row]',
  templateUrl: './gateway-table-row.component.html',
  styleUrls: ['./gateway-table-row.component.scss']
})
export class GatewayTableRowComponent implements OnInit {

  @Input() gateway: Gateway;
  @Output() deleteGateway = new EventEmitter();
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  private alertMessage: string;

  constructor(
    public translate: TranslateService,
    private router: Router
    ) {
      moment.locale('da');
      translate.use('da');
  }

  ngOnInit(): void {
    /* 
    *****Use for testting*****

    const time = new Date();
    const addRandomTime = Math.floor(Math.random() * 200) + 1;
    time.setSeconds(time.getSeconds() - addRandomTime);
    this.gateway.lastSeenAt = time; */
  }

  gatewayStatus(): boolean {
    const errorTime = new Date();
    // 150 seconds is the define error interval: 30 sec heartbeat * 5.
    errorTime.setSeconds(errorTime.getSeconds() - 150);
    if (this.gateway?.lastSeenAt && (errorTime.getTime() < this.gateway?.lastSeenAt.getTime())) {
      return true;
    } else {
      return false;
    }
  }

  lastActive(): string {
    if (this.gateway?.lastSeenAt) {
      return moment(this.gateway.lastSeenAt).fromNow();
    } else {
      return this.translate.instant("ACTIVITY.NEVER");
    }
  }

  clickDelete() {
    this.deleteGateway.emit(this.gateway.id);
  }

  navigateToEditPage() {
    this.router.navigate(['gateway-edit', this.gateway.id]);
  }
}
