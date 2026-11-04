import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MeService } from "@shared/services/me.service";
import { DatatargetService } from "@app/datatarget/datatarget.service";
import { DatatargetDetailTabsCommon } from "@app/datatarget/datatarget-detail/datatarget-detail-tabs-common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessageService } from "@shared/error-message.service";

@Component({
  selector: "app-fiware-detail-tabs",
  templateUrl: "./fiware-detail-tabs.component.html",
  styleUrl: "./fiware-detail-tabs.component.scss",
  standalone: false,
})
export class FiwareDetailTabsComponent extends DatatargetDetailTabsCommon implements OnDestroy {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    meService: MeService,
    location: Location,
    datatargetService: DatatargetService,
    snackBar: MatSnackBar,
    errorMessageService: ErrorMessageService,
    deleteDialogService: DeleteDialogService
  ) {
    super(
      route,
      router,
      translate,
      meService,
      location,
      datatargetService,
      snackBar,
      errorMessageService,
      deleteDialogService
    );
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  protected override getDetailsLink() {
    return "fiware-detail";
  }
}
