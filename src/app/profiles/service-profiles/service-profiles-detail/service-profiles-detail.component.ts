import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { ServiceProfile } from '../service-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-profiles-detail',
  templateUrl: './service-profiles-detail.component.html',

})
export class ServiceProfilesDetailComponent implements OnInit {
  public backButton: BackButton = { label: 'Go back', routerLink: '/profiles' };
  public title: '';
  serviceProfile: ServiceProfile;
  serviceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { translate.use('da'); }

  ngOnInit() {


  }


  onEditServiceProfile() {
    this.router.navigate(['edit-service-profile'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.router.navigate(['/profiles']);
  }

}
