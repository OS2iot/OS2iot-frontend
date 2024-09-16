import { Location } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatargetDetailTabsCommon } from "@applications/datatarget/datatarget-detail/datatarget-detail-tabs-common";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MeService } from "@shared/services/me.service";

@Component({
  selector: "app-mqtt-detail-tabs",
  templateUrl: "./mqtt-detail-tabs.component.html",
  styleUrl: "./mqtt-detail-tabs.component.scss",
})
export class MqttDetailTabsComponent extends DatatargetDetailTabsCommon implements OnDestroy {
  protected override getDetailsLink() {
    return "mqtt-detail";
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
