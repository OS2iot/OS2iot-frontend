import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { MeService } from "@shared/services/me.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  standalone: false,
})
export class UserListComponent implements OnInit {
  public navTabs: any[] = [
    {
      label: "USERS.EXISTING-USERS",
      link: "./existing",
      index: 0,
    },
    {
      label: "USERS.AWAITING-USERS",
      link: "./awaiting",
      index: 1,
    },
  ];
  canEdit: boolean;
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private meService: MeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.translate.get(["TITLE.USER"]).subscribe(translations => {
      this.titleService.setTitle(translations["TITLE.USER"]);
    });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
    if (this.router.url.split("/").length <= 3) {
      this.router.navigateByUrl("admin/users/existing", { replaceUrl: true });
    }
  }
}
