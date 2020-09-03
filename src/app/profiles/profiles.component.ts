import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { ServiceProfile } from './service-profiles/service-profile.model';
import * as ServiceProfilesAction from './service-profiles/store/service-profile.actions'
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
  ) { }

  ngOnInit(): void {
    this.loggingService.printLog('Profiles tapped');
    this.onFetchData();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new ServiceProfilesAction.FetchServiceProfiles());
  }

}
