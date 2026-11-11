import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataTargetConnectionResponse } from "@app/payload-decoder/payload-device-data.model";
import { DatatargetConnectionService } from "@payload-decoder/datatarget-connection.service";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { DatatargetService } from "../../datatarget.service";
import { DatatargetDetail } from "@app/datatarget/datatarget-detail/datatarget-detail";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { Application } from "@applications/application.model";

@Component({
  selector: "app-fiware-detail",
  templateUrl: "./fiware-detail.component.html",
  styleUrls: ["./fiware-detail.component.scss"],
  standalone: false,
})
export class FiwareDetailComponent implements DatatargetDetail, OnDestroy {
  arrowsAltH = faArrowsAltH;

  datatarget: Datatarget;
  dataTargetConnections: DataTargetConnectionResponse[];
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
      this.dataTargetConnections = response.data;
      const applications = this.dataTargetConnections.map(d => d.application);
      const applicationIds = [...new Set(applications.map(a => a.id))];
      this.applications = applications.filter(a => applicationIds.includes(a.id));
    });
}
