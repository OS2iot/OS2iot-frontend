import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigFoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxGroupService } from '@shared/services/sigfox-group.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-sigfox-administration-list',
  templateUrl: './sigfox-administration-list.component.html',
  styleUrls: ['./sigfox-administration-list.component.scss']
})
export class SigfoxAdministrationListComponent implements OnInit {

  public sigfoxGroups: SigFoxGroup[];

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: SharedVariableService,
    private sigfoxGroupService: SigfoxGroupService) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.getSigFoxGroups();
  }

  getSigFoxGroups() {
    /* this.sigfoxGroupService.getSigfoxGroupMultiple(this.getCurrentOrganisationId()).subscribe((response) => {
      this.sigfoxGroups = response.data;
    }); */
    this.sigfoxGroups = [];
    const mock: SigFoxGroup = {
      id: 1,
      name: "min gruppe",
      username: "jeppe",
      password: "123",
      createdAt: null,
      updatedAt: null,
      belongsTo: null
    }
    this.sigfoxGroups.push(mock);
  }

  getCurrentOrganisationId(): number {
    return this.globalService.getSelectedOrganisationId();
  }

  onNewGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
