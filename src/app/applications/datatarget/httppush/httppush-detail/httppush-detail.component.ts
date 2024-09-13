import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PayloadDeviceDatatargetGetByDataTarget } from "@app/payload-decoder/payload-device-data.model";
import { PayloadDeviceDatatargetService } from "@app/payload-decoder/payload-device-datatarget.service";
import { DatatargetDetail } from "@applications/datatarget/datatarget-detail/datatarget-detail";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { MeService } from "@shared/services/me.service";
import { Subscription } from "rxjs";
import { Datatarget } from "../../datatarget.model";
import { DatatargetService } from "../../datatarget.service";

@Component({
  selector: "app-httppush-detail",
  templateUrl: "./httppush-detail.component.html",
  styleUrls: ["./httppush-detail.component.scss"],
})
export class HttppushDetailComponent implements DatatargetDetail, OnDestroy {
  dataTargetType = DataTargetType;
  arrowsAltH = faArrowsAltH;

  datatarget: Datatarget;
  dataTargetRelations: PayloadDeviceDatatargetGetByDataTarget[];
  canEdit: boolean;

  private subscriptions: Subscription[];

  constructor(
    route: ActivatedRoute,
    meService: MeService,
    private datatargetService: DatatargetService,
    private datatargetRelationServicer: PayloadDeviceDatatargetService
  ) {
    const paramMap = route.parent.snapshot.paramMap;
    const id: number = +paramMap.get("datatargetId");
    const appId: number = +paramMap.get("id");

    if (id) {
      this.subscriptions = [this.getDatatarget(id), this.getDatatargetRelations(id)];
    }
    this.canEdit = meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite, undefined, appId);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(s => s?.unsubscribe());
  }

  private getDatatarget = (id: number) =>
    this.datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
      this.datatarget = dataTarget;
    });

  private getDatatargetRelations = (id: number) =>
    this.datatargetRelationServicer.getByDataTarget(id).subscribe(response => {
      this.dataTargetRelations = response.data;
    });
}
