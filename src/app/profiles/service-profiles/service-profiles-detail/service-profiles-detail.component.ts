import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { ServiceProfile, ServiceProfileResponseOne } from '../service-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProfileService } from '@shared/services/service-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-profiles-detail',
  templateUrl: './service-profiles-detail.component.html',

})
export class ServiceProfilesDetailComponent implements OnInit, OnDestroy {
  public backButton: BackButton = { label: 'Tilbage', routerLink: '/profiles' };
  public title: '';
  serviceProfile: ServiceProfile;
  serviceId: string;
  serviceSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private serviceProfileService: ServiceProfileService
  ) { translate.use('da'); }

  ngOnInit() {
    this.translate.use('da');
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    if (this.serviceId) {
      this.getServiceProfile(this.serviceId);
    }
  }

  getServiceProfile(id: string) {
    this.serviceSubscription = this.serviceProfileService.getOne(id)
    .subscribe((response: ServiceProfileResponseOne) => {
      this.serviceProfile = response.serviceProfile;
      }
    );
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      // tslint:disable-next-line: no-unused-expression
      this.serviceSubscription.unsubscribe;
    }
  }

  onEditServiceProfile() {
    this.router.navigate(['edit-service-profile'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.serviceProfileService.delete(this.serviceProfile.id).subscribe( (response) => {
      if (response.ok) {
        this.router.navigate(['/profiles']);
      }
    });
  }

}
