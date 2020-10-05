import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxDeviceType } from '@app/sigfox/sigfox-device-type.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-sigfox-profiles-list',
  templateUrl: './sigfox-profiles-list.component.html',
  styleUrls: ['./sigfox-profiles-list.component.scss']
})
export class SigfoxProfilesListComponent implements OnInit {

  public sigfoxDeviceTypes: SigfoxDeviceType[];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: SharedVariableService,
  ) { }

  ngOnInit(): void {
    this.sigfoxDeviceTypes = [{
      name: 'device 1',
      contractId: '123123',
      description: 'Main device',
      keepAlive: 1,
      alertEmail: 'email@email.com'
    }];
  }

  getCurrentOrganisationId(): number {
    return this.globalService.getSelectedOrganisationId();
  }

  onNewGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
