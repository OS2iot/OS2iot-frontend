import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { DatatargetTypesService } from '../datatarget-types.service';
import { Datatarget } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';
import { DatatargetEdit } from './datatarget-edit';
import { DatatargetEditTypeSelectorDirective } from './datatarget-edit-type-selector.directive';

@Component({
  selector: 'app-datatarget-edit',
  templateUrl: './datatarget-edit.component.html',
  styleUrls: ['./datatarget-edit.component.scss']
})
export class DatatargetEditComponent implements OnInit, OnDestroy {

  @ViewChild(DatatargetEditTypeSelectorDirective, {static: true}) adHost!: DatatargetEditTypeSelectorDirective;

  public datatarget: Datatarget;
  private datatargetType: DataTargetType;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private datatargetService: DatatargetService,
              private route: ActivatedRoute,
              private datatargetTypesService: DatatargetTypesService
      ) { }


  loadComponent(componentType: Type<any>) {
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      viewContainerRef.createComponent<DatatargetEdit>(factory);
  }

  ngOnInit(): void {

       const id: number = +this.route.snapshot.paramMap.get('datatargetId');

       if (id > 0) {
        this.datatargetService.get(id)
        .subscribe((dataTarget: Datatarget) => {
            this.datatarget = dataTarget;
            this.datatargetType = dataTarget.type;
            const component = this.datatargetTypesService.getEditComponent(this.datatargetType);
            this.loadComponent(component);
        });
      } else {
        let datatargetTypeParam = this.route.snapshot.paramMap.get('datatargetType');
        this.datatargetType = this.enumFromStringValue<DataTargetType>(DataTargetType, datatargetTypeParam);
        if (this.datatargetType) {
          const component = this.datatargetTypesService.getEditComponent(this.datatargetType);
          this.loadComponent(component);
        }
      }


  }

  enumFromStringValue<T>(enm: { [s: string]: T}, value: string): T | undefined {
    return (Object.values(enm) as unknown as string[]).includes(value)
      ? value as unknown as T
      : undefined;
  }

  ngOnDestroy() {

    }
}
