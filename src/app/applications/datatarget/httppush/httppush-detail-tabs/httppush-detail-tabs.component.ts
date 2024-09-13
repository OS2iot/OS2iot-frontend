import { Location } from "@angular/common";
import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatargetDetail } from "@applications/datatarget/datatarget-detail/datatarget-detail";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { BackButton } from "@shared/models/back-button.model";
import { DropdownButton } from "@shared/models/dropdown-button.model";
import { MeService } from "@shared/services/me.service";
import { NavTab } from "@shared/types/nav-tabs.type";
import { Subscription } from "rxjs";

@Component({
  selector: "app-httppush-detail-tabs",
  templateUrl: "./httppush-detail-tabs.component.html",
  styleUrl: "./httppush-detail-tabs.component.scss",
})
export class HttppushDetailTabsComponent implements DatatargetDetail, OnDestroy {
  dataTargetType = DataTargetType;

  navTabs: NavTab[] = [
    {
      label: "APPLICATION.DETAILS",
      link: "httppush-detail",
      index: 0,
    },
    {
      label: "IOTDEVICE.HISTORY",
      link: "datatarget-log",
      index: 1,
    },
  ];

  datatarget: Datatarget;
  dropdownButton: DropdownButton;
  backButton: BackButton = { label: "", routerLink: undefined };
  canEdit: boolean;

  private subscriptions: Subscription[] = [];
  private deleteDialogSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    meService: MeService,
    private location: Location,
    private datatargetService: DatatargetService,
    public deleteDialogService: DeleteDialogService
  ) {
    // Load first tab if none was selected
    const path = this.location.path();
    if (!this.navTabs.some(tab => path.includes(tab.link))) {
      router.navigate([path, this.navTabs[0].link], { replaceUrl: true });
    }
    // URL params
    const paramMap = route.snapshot.paramMap;
    const id: number = +paramMap.get("datatargetId");
    const appId: number = +paramMap.get("id");
    if (id) {
      this.subscriptions.push(this.getDatatarget(id));
      this.dropdownButton = {
        label: "",
        editRouterLink: "../../datatarget-edit/" + id,
        isErasable: true,
      };
    }

    this.subscriptions.push(
      translate.get(["NAV.MY-DATATARGET", "DATATARGET.SHOW-OPTIONS"]).subscribe(translations => {
        this.backButton.label = translations["NAV.MY-DATATARGET"];
        this.dropdownButton.label = translations["DATATARGET.SHOW-OPTIONS"];
      })
    );

    this.canEdit = meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite, undefined, appId);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(s => s?.unsubscribe());
    this.deleteDialogSubscription?.unsubscribe();
  }

  getDatatarget = (id: number) =>
    this.datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
      this.datatarget = dataTarget;
    });

  onDeleteDatatarget() {
    this.deleteDialogSubscription?.unsubscribe();
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
      // Do nothing if user cancels
      if (!response) return;
      this.subscriptions.push(
        this.datatargetService.delete(this.datatarget.id).subscribe((deleteResponse: HttpResponse<any>) => {
          if (deleteResponse?.ok) {
            this.location.back();
          } else {
            // TODO: Show error / snackbar??
            console.log("Delete failed", deleteResponse);
          }
        })
      );
    });
  }
}
