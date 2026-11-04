import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MeService } from "@shared/services/me.service";
import { DatatargetDetailTabsCommon } from "@app/datatarget/datatarget-detail/datatarget-detail-tabs-common";
import { DatatargetService } from "@app/datatarget/datatarget.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessageService } from "@shared/error-message.service";

@Component({
  selector: "app-mqtt-detail-tabs",
  templateUrl: "./mqtt-detail-tabs.component.html",
  styleUrl: "./mqtt-detail-tabs.component.scss",
  standalone: false,
})
export class MqttDetailTabsComponent extends DatatargetDetailTabsCommon implements OnDestroy {
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
    return "mqtt-detail";
  }
}
