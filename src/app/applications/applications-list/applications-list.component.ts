import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { Application } from '@applications/application.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { MeService } from '@shared/services/me.service';

@Component({
  providers: [NavbarComponent],
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent implements OnInit {
  isLoadingResults = false;

  public pageLimit = environment.tablePageSize;
  public resultsLength: number;
  public pageOffset = 0;
  public applications: Application[];
  @Input() organizationId: number;
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private globalService: SharedVariableService,
    private meService: MeService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.APPLICATION'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.APPLICATION']);
      });
    this.organizationId = this.globalService.getSelectedOrganisationId();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  updatePageLimit(limit: any) {
    console.log(limit);
  }
}
