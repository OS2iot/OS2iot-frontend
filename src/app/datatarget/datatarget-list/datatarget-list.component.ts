import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { Title } from "@angular/platform-browser";
import { environment } from "@environments/environment";

@Component({
  selector: "app-datatarget-list",
  templateUrl: "./datatarget-list.component.html",
  styleUrl: "./datatarget-list.component.scss",
  standalone: false,
})
export class DatatargetListComponent implements OnInit {
  public pageLimit = environment.tablePageSize;
  canEdit: boolean;

  constructor(
    private meService: MeService,
    private translate: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.translate.get(["TITLE.DATATARGET"]).subscribe(translations => {
      this.titleService.setTitle(translations["TITLE.DATATARGET"]);
    });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.DataTargetWrite);
  }
}
