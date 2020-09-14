import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { DeviceProfile } from '../device-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-profiles-detail',
  templateUrl: './device-profiles-detail.component.html',

})
export class DeviceProfilesDetailComponent implements OnInit {
  public backButton: BackButton = { label: 'Go back', routerLink: '/profiles' };
  public title: '';
  deviceProfile: DeviceProfile;
  deviceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { translate.use('da'); }

  ngOnInit() {

  }


  onEditDeviceProfile() {
    this.router.navigate(['edit-device-profile'], { relativeTo: this.route });
  }

  onDeleteDeviceProfile() {
    this.router.navigate(['/profiles']);
  }

}
