import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDatabase, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable, Subscription } from 'rxjs';
import { SigfoxGroupsListItemComponent } from './sigfox-groups-list-item/sigfox-groups-list-item.component';

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
    this.router.navigate(['new-group'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
