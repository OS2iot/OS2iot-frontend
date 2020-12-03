import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceProfile } from '../../device-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-device-profiles-item',
  templateUrl: './device-profiles-item.component.html',
  styleUrls: ['./device-profiles-item.component.scss']
})
export class DeviceProfilesItemComponent implements OnInit {
  @Input() deviceProfile: DeviceProfile;
  @Input() index: number;
  @Output() deleteDeviceProfile = new EventEmitter();
  deviceId: number;
  faTimesCircle = faTimesCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onDeleteDeviceProfile() {
    this.deleteDeviceProfile.emit(this.deviceProfile.id);
  }

}
