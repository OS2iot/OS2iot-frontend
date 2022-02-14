import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, QueryList, Type, ViewChild, ViewChildren} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { DatatargetTypesServiceService } from '../datatarget-types-service.service';
import { Datatarget } from '../datatarget.model';
import { DatatargetService } from '../datatarget.service';
import { HttppushDetailComponent } from '../httppush/httppush-detail/httppush-detail.component';
import { DatatargetDetail } from './datatarget-detail';
import { DatatargetDetailTypeSelectorDirective } from './datatarget-detail-type-selector.directive';

@Component({
    selector: 'app-datatarget-detail',
    templateUrl: './datatarget-detail.component.html',
    styleUrls: ['./datatarget-detail.component.scss']
})
export class DatatargetDetailComponent implements OnInit, OnDestroy {

    @ViewChild(DatatargetDetailTypeSelectorDirective, {static: true}) adHost!: DatatargetDetailTypeSelectorDirective;

    private applicationName: string;
    public datatarget: Datatarget;
    private datatargetType: DataTargetType;
        
    constructor(private componentFactoryResolver: ComponentFactoryResolver,  
        private datatargetService: DatatargetService,
        private route: ActivatedRoute,
        private datatargetTypesService: DatatargetTypesServiceService
        ) { }
   

    loadComponent(componentType: Type<any>) {
       
        const viewContainerRef = this.adHost.viewContainerRef;
    
        viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = viewContainerRef.createComponent<DatatargetDetail>(factory)
    

    }

    ngOnInit(): void {

         this.applicationName = this.route.snapshot.paramMap.get('name');
         const id: number = +this.route.snapshot.paramMap.get('datatargetId');
        
        this.datatargetService.get(id)
          .subscribe((dataTarget: Datatarget) => {
              this.datatarget = dataTarget;
              this.datatargetType = dataTarget.type;
    
              const component = this.datatargetTypesService.getDetailComponent(this.datatargetType);

              this.loadComponent(component);
              
          });

        
    }

    ngOnDestroy() {
      
      }
}
