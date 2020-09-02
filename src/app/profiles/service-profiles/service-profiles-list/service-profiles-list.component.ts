import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ServiceProfile } from '../service-profile.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';




@Component({
  selector: 'app-service-profiles-list',
  templateUrl: './service-profiles-list.component.html',
  styleUrls: ['./service-profiles-list.component.scss']
})
export class ServiceProfilesListComponent implements OnInit, OnDestroy {
  serviceProfiles: ServiceProfile[];
  subscription: Subscription;
  public pageLimit: number = 10;
  public pageOffset: number = 0;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store
      .select('serviceProfiles')
      .pipe(map(serviceProfileState => serviceProfileState.serviceProfiles))
      .subscribe((serviceProfiles: ServiceProfile[]) => {
        this.serviceProfiles = serviceProfiles;
      });
  }
  private fetchServiceProfiles() {
    // this.shouldLoadNewHold = false;
    // this.isFetching = true;
    this.pageCount = this.pageCount + 1;
    this.store.dispatch('serviceProfiles' ({limit: this.pageLimit}));
  }

  // onNewServiceProfile() {
  //   this.router.navigate(['new'], { relativeTo: this.route });
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
