import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ServiceProfile } from '../service-profile.model';
import * as fromApp from '../../../store/app.reducer';
import * as ServiceProfilesActions from '../store/service-profile.actions';
import { BackButton } from 'src/app/models/back-button';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-service-profiles-detail',
  templateUrl: './service-profiles-detail.component.html',

})
export class ServiceProfilesDetailComponent implements OnInit {
  public backButton: BackButton = { label: 'Go back', routerLink: '/profiles' };
  public title: '';
  serviceProfile: ServiceProfile;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) { translate.use('da'); }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('serviceProfiles');
        }),
        map(serviceProfilesState => {
          return serviceProfilesState.serviceProfiles.find((serviceProfile, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(serviceProfile => {
        this.serviceProfile = serviceProfile;
      });

  }


  onEditServiceProfile() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.store.dispatch(new ServiceProfilesActions.DeleteServiceProfile(this.id));
    this.router.navigate(['/serviceProfiles']);
  }

}
