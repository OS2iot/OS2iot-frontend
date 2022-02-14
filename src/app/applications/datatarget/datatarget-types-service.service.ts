import { Injectable, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { DatatargetTypeDescriptor } from './datatarget.model';
import { FiwareDetailComponent } from './fiware/fiware-detail/fiware-detail.component';
import { FiwareEditComponent } from './fiware/fiware-edit/fiware-edit.component';
import { HttppushDetailComponent } from './httppush/httppush-detail/httppush-detail.component';
import { HttppushEditComponent } from './httppush/httppush-edit/httppush-edit.component';

@Injectable({
  providedIn: 'root'
})
export class DatatargetTypesServiceService {

constructor() { }

  getAvailableDataTargetTypes() : DatatargetTypeDescriptor[]
  {
      return [  
        { name: "Generisk HTTP Push",
          type: DataTargetType.HTTPPUSH,
          icon: null,
          description: "Send data med HTTP POST requests til et HTTP URL endpoint",
          readMoreUrl: "",
          provider: "OS2"
         
        },
        { name: "Open Data DK",
          type: DataTargetType.OPENDATADK,
          icon: "/assets/images/logo_opendatadk.svg",
          description: "Offentliggør datasæt i Open Data DK's åbne dataportal.",
          readMoreUrl: "https://www.opendata.dk/",
          provider: "OS2"
       
        },
        { name: "FIWARE connection",
          type: DataTargetType.FIWARE,
          icon: "/assets/images/logo_FIWARE.png",
          description: "En integration til FIWARE Context Broker"     ,
          readMoreUrl: "https://www.kmd.dk",
          provider: "KMD A/S"
        }
      ]
  }

  getDetailComponent(dataTargetType: DataTargetType): Type<any>
  {
    if (dataTargetType == DataTargetType.HTTPPUSH)
    {
      return HttppushDetailComponent;
    }

    if (dataTargetType == DataTargetType.OPENDATADK)
    {
      return HttppushDetailComponent;
    }

    if (dataTargetType == DataTargetType.FIWARE)
    {
      return FiwareDetailComponent;
    }
  }

  getEditComponent(dataTargetType: DataTargetType): Type<any>
  {
    if (dataTargetType == DataTargetType.HTTPPUSH)
    {
      return HttppushEditComponent;
    }

    if (dataTargetType == DataTargetType.OPENDATADK)
    {
      return HttppushEditComponent;
    }

    if (dataTargetType == DataTargetType.FIWARE)
    {
      return FiwareEditComponent;
    }
  }

}

