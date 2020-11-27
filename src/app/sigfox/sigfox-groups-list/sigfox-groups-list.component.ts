import { Component, OnDestroy, OnInit } from '@angular/core';
import { faDatabase, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sigfox-groups-list',
  templateUrl: './sigfox-groups-list.component.html',
  styleUrls: ['./sigfox-groups-list.component.scss']
})
export class SigfoxGroupsListComponent implements OnInit, OnDestroy {
  faDatabase = faDatabase;
  faToolbox = faToolbox;
  subscription: Subscription;

  public sigfoxGroups: Observable<SigfoxGroup[]>;

  constructor(
    public translate: TranslateService,
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
