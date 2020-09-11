import { Component, OnInit, Input } from '@angular/core';
import { ServiceProfile } from '../../service-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ServiceProfilesActions from '../../store/service-profile.actions';
import * as fromApp from '@store/app.reducer';
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-service-profile-item',
  templateUrl: './service-profile-item.component.html',
  styleUrls: ['./service-profile-item.component.scss']
})
export class ServiceProfileItemComponent implements OnInit {
  @Input() serviceProfile: ServiceProfile;
  @Input() index: number;
  id: number;
  faPen = faPen;
  faTimesCircle = faTimesCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
  }

  onEditServiceProfile() {
    this.router.navigate([this.index, 'edit-profile'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.store.dispatch(ServiceProfilesActions.deleteServiceProfile({ index: this.id }));
    this.router.navigate(['/profiles']);
  }

}
