
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sigfox-groups-detail',
  templateUrl: './sigfox-groups-detail.component.html',
  styleUrls: ['./sigfox-groups-detail.component.scss']
})
export class SigfoxGroupsDetailComponent implements OnInit {
  isLoadingResults = true;
  private sigfoxGroupId: number;
  sigfoxDevices: SigfoxDeviceType[];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private sigfoxService: SigfoxService,

  ) { }

  ngOnInit(): void {
    this.sigfoxGroupId = +this.route.snapshot.paramMap.get('groupId');
    this.getSigFoxDevices();
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

}
