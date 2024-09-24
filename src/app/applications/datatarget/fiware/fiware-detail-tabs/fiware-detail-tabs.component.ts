import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatargetDetailTabsCommon } from "@applications/datatarget/datatarget-detail/datatarget-detail-tabs-common";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MeService } from "@shared/services/me.service";

@Component({
  selector: "app-fiware-detail-tabs",
  templateUrl: "./fiware-detail-tabs.component.html",
  styleUrl: "./fiware-detail-tabs.component.scss",
})
export class FiwareDetailTabsComponent extends DatatargetDetailTabsCommon implements OnDestroy {
  protected override getDetailsLink() {
    return "fiware-detail";
  }

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    meService: MeService,
    location: Location,
    datatargetService: DatatargetService,
    deleteDialogService: DeleteDialogService
  ) {
    super(route, router, translate, meService, location, datatargetService, deleteDialogService);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
