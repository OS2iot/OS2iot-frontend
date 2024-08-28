import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { DatatargetTypesService } from "../datatarget-types.service";
import { Datatarget } from "../datatarget.model";
import { DatatargetService } from "../datatarget.service";
import { DatatargetDetail } from "./datatarget-detail";
import { DatatargetDetailTypeSelectorDirective } from "./datatarget-detail-type-selector.directive";

@Component({
    selector: "app-datatarget-detail",
    templateUrl: "./datatarget-detail.component.html",
    styleUrls: ["./datatarget-detail.component.scss"],
})
export class DatatargetDetailComponent implements OnInit, OnDestroy {
    @ViewChild(DatatargetDetailTypeSelectorDirective, { static: true })
    adHost!: DatatargetDetailTypeSelectorDirective;

    public datatarget: Datatarget;
    private datatargetType: DataTargetType;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private datatargetService: DatatargetService,
        private route: ActivatedRoute,
        private datatargetTypesService: DatatargetTypesService
    ) {}

    loadComponent(componentType: Type<any>) {
        const viewContainerRef = this.adHost.viewContainerRef;

        viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        viewContainerRef.createComponent<DatatargetDetail>(factory);
    }

    ngOnInit(): void {
        const id: number = +this.route.snapshot.paramMap.get("datatargetId");

        this.datatargetService.get(id).subscribe((dataTarget: Datatarget) => {
            this.datatarget = dataTarget;
            this.datatargetType = dataTarget.type;

            const component = this.datatargetTypesService.getDetailComponent(this.datatargetType);

            this.loadComponent(component);
        });
    }

    ngOnDestroy() {}
}
