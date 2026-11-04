import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataTargetConnectionResponse } from "@app/payload-decoder/payload-device-data.model";
import { DatatargetConnectionService } from "@payload-decoder/datatarget-connection.service";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { Subscription } from "rxjs";
import { DatatargetService } from "../../datatarget.service";
import { DatatargetDetail } from "@app/datatarget/datatarget-detail/datatarget-detail";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { Application } from "@applications/application.model";

@Component({
  selector: "app-httppush-detail",
  templateUrl: "./httppush-detail.component.html",
  styleUrls: ["./httppush-detail.component.scss"],
  standalone: false,
})
export class HttppushDetailComponent implements DatatargetDetail, OnDestroy {
  dataTargetType = DataTargetType;
  arrowsAltH = faArrowsAltH;

  datatarget: Datatarget;
  dataTargetRelations: DataTargetConnectionResponse[];
  applications: Application[];
  private subscriptions: Subscription[];

  constructor(
    route: ActivatedRoute,
    private datatargetService: DatatargetService,
    private datatargetRelationService: DatatargetConnectionService
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
      const applications = this.dataTargetRelations.flatMap(d => d.application);
      this.applications = [...new Map(applications.map(a => [a.id, a])).values()];
    });
}
