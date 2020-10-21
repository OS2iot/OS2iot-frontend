import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SearchResultDto,
  SearchResultType,
} from '@app/search/search-results.model';
import { LoggingService } from '@shared/services/logging.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'tr[app-search-table-row]',
  templateUrl: './search-table-row.component.html',
  styleUrls: ['./search-table-row.component.scss'],
})
export class SearchTableRowComponent implements OnInit {
  @Input() searchResult: SearchResultDto;

  constructor(
    private globalService: SharedVariableService,
    private router: Router
  ) {
    console.log('row');
  }

  ngOnInit(): void {}

  getIcon(type: SearchResultType) {
    if (type == SearchResultType.IoTDevice) {
      return 'fa-microchip';
    } else if (type == SearchResultType.Application) {
      return 'fa-layer-group';
    } else if (type == SearchResultType.Gateway) {
      return 'fa-broadcast-tower';
    } else {
      return '';
    }
  }

  goToResult() {
    if (this.searchResult.organizationId != null) {
      if (
        this.globalService.getSelectedOrganisationId() !=
        this.searchResult.organizationId
      ) {
        this.globalService.setValue(this.searchResult.organizationId);
      }
    }

    if (this.searchResult.type == SearchResultType.IoTDevice) {
      this.router.navigate([
        '/applications',
        this.searchResult.applicationId,
        'iot-device',
        this.searchResult.id,
      ]);
    } else if (this.searchResult.type == SearchResultType.Application) {
      this.router.navigate(['/applications', this.searchResult.id]);
    } else if (this.searchResult.type == SearchResultType.Gateway) {
      this.router.navigate(['/gateways/gateway-detail', this.searchResult.id]);
    }
  }
}
