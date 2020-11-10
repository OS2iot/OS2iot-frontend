import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceModel, DeviceModelBody, DeviceModelRequest } from './device.model';
import { DeviceCategory } from './Enums/device-category.enum';

@Injectable({
  providedIn: 'root',
})
export class DeviceModelService {

  private DEVICEMODELURL = 'device-model';

  constructor(
    private restService: RestService,
    private sharedVariable: SharedVariableService) { }

  create(deviceModel: DeviceModel): Observable<any> {
    const body = new DeviceModelRequest(deviceModel.body, +this.sharedVariable.getSelectedOrganisationId());
    return this.restService.post(this.DEVICEMODELURL, body, { observe: 'response' });
  }

  update(deviceModel: DeviceModel, id: number): Observable<any> {
    const body = new DeviceModelRequest(deviceModel.body, +this.sharedVariable.getSelectedOrganisationId());
    return this.restService.put(this.DEVICEMODELURL, body, id, {
      observe: 'response',
    });
  }

  get(id: number): Observable<any> {
    return this.restService.get(this.DEVICEMODELURL, {}, id).pipe(
      map(
        response =>
          new DeviceModel(
            response.id,
            new DeviceModelBody(
              response.body.id,
              response.body.name,
              response.body.brandName,
              response.body.modelName,
              response.body.manufacturerName,
              response.body.category,
              response.body.energyLimitationClass,
              response.body.controlledProperty,
              response.body.supportedUnits,
              response.body.function,
              response.body.supportedProtocol
            )
          )
        )
      );
  }

  getMultiple(): Observable<any> {
    const organizationId = this.sharedVariable.getSelectedOrganisationId();
    return this.restService.get(this.DEVICEMODELURL, {organizationId})
      .pipe(
        map(
          response => response.data.map( (item: any) =>
            new DeviceModel(
              item.id,
              new DeviceModelBody(
                item.body.id,
                item.body.name,
                item.body.brandName,
                item.body.modelName,
                item.body.manufacturerName,
                item.body.category,
                item.body.energyLimitationClass,
                item.body.controlledProperty,
                item.body.supportedUnits,
                item.body.function,
                item.body.supportedProtocol
                )
              )
            )
          )
        );
  }

  delete(id: number) {
    return this.restService.delete(this.DEVICEMODELURL, id);
  }
}
