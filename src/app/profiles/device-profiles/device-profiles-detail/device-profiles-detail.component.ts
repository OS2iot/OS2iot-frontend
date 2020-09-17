import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { DeviceProfile } from '../device-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceProfileService } from '@shared/services/device-profile.service';

@Component({
  selector: 'app-device-profiles-detail',
  templateUrl: './device-profiles-detail.component.html',

})
export class DeviceProfilesDetailComponent implements OnInit {
  public backButton: BackButton = { label: 'Tilbage', routerLink: '/profiles' };
  public title: '';
  deviceProfile: DeviceProfile;
  deviceId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private deviceProfileService: DeviceProfileService
  ) { translate.use('da'); }

  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('deviceId');
    if (this.deviceId) {
      this.getDeviceProfile();
    }
  }

  getDeviceProfile() {
    this.deviceProfileService.getOne(this.deviceId).subscribe((response) => {
      this.deviceProfile = response.deviceProfile;
    });
  }

  onEditDeviceProfile() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteDeviceProfile() {
    this.router.navigate(['/profiles']);
  }

}
