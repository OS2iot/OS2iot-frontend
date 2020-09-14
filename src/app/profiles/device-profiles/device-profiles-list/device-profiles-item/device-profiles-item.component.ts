import { Component, OnInit, Input } from '@angular/core';
import { DeviceProfile } from '../../device-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as DeviceProfilesActions from '../../store/device-profile.actions';
import * as fromApp from '@store/app.reducer';
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-device-profiles-item',
  templateUrl: './device-profiles-item.component.html',
  styleUrls: ['./device-profiles-item.component.scss']
})
export class DeviceProfilesItemComponent implements OnInit {
  @Input() deviceProfile: DeviceProfile;
  @Input() index: number;
  deviceId: number;
  faPen = faPen;
  faTimesCircle = faTimesCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
  }

  onEditDeviceProfile() {
    this.router.navigate([this.index, 'edit-device-profile'], { relativeTo: this.route });
  }

  onDeleteDeviceProfile() {
    this.store.dispatch(DeviceProfilesActions.deleteDeviceProfile({ index: this.deviceId }));
    this.router.navigate(['/profiles']);
  }

}
