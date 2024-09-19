import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatargetDetailTabsCommon } from "@applications/datatarget/datatarget-detail/datatarget-detail-tabs-common";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { MeService } from "@shared/services/me.service";

@Component({
  selector: "app-httppush-detail-tabs",
  templateUrl: "./httppush-detail-tabs.component.html",
  styleUrl: "./httppush-detail-tabs.component.scss",
})
export class HttppushDetailTabsComponent extends DatatargetDetailTabsCommon implements OnDestroy {
  dataTargetType = DataTargetType;

  protected override getDetailsLink() {
    return "httppush-detail";
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
