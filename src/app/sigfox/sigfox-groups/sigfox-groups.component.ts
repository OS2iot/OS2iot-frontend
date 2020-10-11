import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDatabase, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-sigfox-groups',
  templateUrl: './sigfox-groups.component.html',
  styleUrls: ['./sigfox-groups.component.scss']
})
export class SigfoxGroupsComponent implements OnInit {
  faDatabase = faDatabase;
  faToolbox = faToolbox;

  public sigfoxGroups: SigfoxGroup[];
  public sigfoxGroup: SigfoxGroup;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: SharedVariableService,
    private sigfoxService: SigfoxService) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.getSigFoxGroups();
  }

  getSigFoxGroups() {
    this.sigfoxService.getGroups(this.getCurrentOrganisationId())
      .subscribe((response) => {
        this.sigfoxGroups = response.data;
      },
        (error) => {
          console.log(error);
        }
      );
  }

  getCurrentOrganisationId(): number {
    return this.globalService.getSelectedOrganisationId();
  }

  onNewGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onEditSigfoxGroup() {
    this.router.navigate([this.sigfoxGroup.id, 'edit'], { relativeTo: this.route });
  }
}
