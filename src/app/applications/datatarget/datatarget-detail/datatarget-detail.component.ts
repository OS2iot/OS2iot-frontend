import { Component, OnDestroy, Type, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { Subscription } from "rxjs";
import { DatatargetTypesService } from "../datatarget-types.service";
import { Datatarget } from "../datatarget.model";
import { DatatargetService } from "../datatarget.service";
import { DatatargetDetail } from "./datatarget-detail";
import { DatatargetDetailTypeSelectorDirective } from "./datatarget-detail-type-selector.directive";

@Component({
  selector: "app-datatarget-detail",
  templateUrl: "./datatarget-detail.component.html",
  styleUrls: ["./datatarget-detail.component.scss"],
  standalone: false,
})
export class DatatargetDetailComponent implements OnDestroy {
  @ViewChild(DatatargetDetailTypeSelectorDirective, { static: true })
  adHost!: DatatargetDetailTypeSelectorDirective;

  public datatarget: Datatarget;
  private datatargetType: DataTargetType;

  private datatargetSubscription: Subscription;

  constructor(
    datatargetService: DatatargetService,
    route: ActivatedRoute,
    datatargetTypesService: DatatargetTypesService
  ) {
    const id: number = +route.snapshot.paramMap.get("datatargetId");

    this.datatargetSubscription = datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
      this.datatarget = dataTarget;
      this.datatargetType = dataTarget.type;

      const component = datatargetTypesService.getDetailComponent(this.datatargetType);

      this.loadComponent(component);
    });
  }

  loadComponent(componentType: Type<any>) {
    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    viewContainerRef.createComponent<DatatargetDetail>(componentType);
  }

  ngOnDestroy() {
    this.datatargetSubscription?.unsubscribe();
  }
}
