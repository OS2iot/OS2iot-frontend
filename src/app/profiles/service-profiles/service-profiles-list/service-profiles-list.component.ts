import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ServiceProfile } from '../service-profile.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-profiles-list',
  templateUrl: './service-profiles-list.component.html',
  styleUrls: ['./service-profiles-list.component.scss']
})
export class ServiceProfilesListComponent implements OnInit, OnDestroy {
  serviceProfiles: ServiceProfile[];
  subscription: Subscription;
  public pageLimit: 10;
  public pageOffset: 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onNewServiceProfile() {
    this.router.navigate(['new-service-profile'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
