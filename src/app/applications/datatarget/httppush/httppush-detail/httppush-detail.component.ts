import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PayloadDeviceDatatargetResponse } from "@app/payload-decoder/payload-device-data.model";
import { PayloadDeviceDatatargetService } from "@app/payload-decoder/payload-device-datatarget.service";
import { DatatargetDetail } from "@applications/datatarget/datatarget-detail/datatarget-detail";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { DataTargetType } from "@shared/enums/datatarget-type";
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
  dataTargetRelations: PayloadDeviceDatatargetResponse[];

  private subscriptions: Subscription[];

  constructor(
    route: ActivatedRoute,
    private datatargetService: DatatargetService,
    private datatargetRelationService: PayloadDeviceDatatargetService
  ) {
    const id: number = +route.parent.snapshot.paramMap.get("datatargetId");
    if (id) {
      this.subscriptions = [this.getDatatarget(id), this.getDatatargetRelations(id)];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(s => s?.unsubscribe());
  }

  private getDatatarget = (id: number) =>
    this.datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
      this.datatarget = dataTarget;
    });

  private getDatatargetRelations = (id: number) =>
    this.datatargetRelationService.getByDataTarget(id).subscribe(response => {
      this.dataTargetRelations = response.data;
    });
}
