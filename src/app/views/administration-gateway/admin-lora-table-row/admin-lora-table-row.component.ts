import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Gateway } from 'src/app/models/gateway';

@Component({
  selector: 'tr[app-admin-lora-table-row]',
  templateUrl: './admin-lora-table-row.component.html',
  styleUrls: ['./admin-lora-table-row.component.scss']
})
export class AdminLoraTableRowComponent implements OnInit {

  @Input() gateway: Gateway;

  @Output() deleteGateway = new EventEmitter();
  
  private alertMessage: string;

  constructor(
    public translate: TranslateService,
    private router: Router
    ) {
      translate.use('da');
  }

  ngOnInit(): void {
  }

  clickDelete() {
    this.deleteGateway.emit(this.gateway.id);
  }

  navigateToEditPage(){
    this.router.navigate(['edit-gateway', this.gateway.id])
  }
}
