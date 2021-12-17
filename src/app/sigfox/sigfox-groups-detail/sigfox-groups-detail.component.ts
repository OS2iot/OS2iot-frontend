
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SigfoxGroupData } from '@sigfox/sigfox-settings.model';
import { Observable } from 'rxjs';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';


@Component({
  selector: 'app-sigfox-groups-detail',
  templateUrl: './sigfox-groups-detail.component.html',
  styleUrls: ['./sigfox-groups-detail.component.scss']
})
export class SigfoxGroupsDetailComponent implements OnInit {
  isLoadingResults = true;
  private sigfoxGroupId: number;
  sigfoxDevices: SigfoxDeviceType[];
  sigfoxGroup: SigfoxGroup;
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private sigfoxService: SigfoxService,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.sigfoxGroupId = +this.route.snapshot.paramMap.get('groupId');
    this.getSigFoxGroup(this.sigfoxGroupId);
    this.getSigFoxDevices();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  getSigFoxDevices() {
    this.sigfoxService.getDeviceTypes(this.sigfoxGroupId)
      .subscribe((response) => {
        this.sigfoxDevices = response.data;
        this.isLoadingResults = false;
      },
        (error) => {
          console.log(error);
        }
      );
  }

  getSigFoxGroup(id: number) {
    this.sigfoxService.getGroup(id, {})
      .subscribe((response) => {
        this.sigfoxGroup = response;
      },
        (error) => {
          console.log(error);
        }
      );
  }

}
