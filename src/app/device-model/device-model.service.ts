import { Injectable } from '@angular/core';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { buildDriverProvider } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceModel, DeviceModelBody, DeviceModelRequest, DeviceModelResponse } from './device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceModelService {

  private DEVICEMODELURL = 'device-model';

  constructor(
    private restService: RestService,
    private sharedVariable: SharedVariableService,
    private userMinimalService: UserMinimalService) { }

  create(deviceModel: DeviceModel): Observable<any> {
    this.trimModel(deviceModel.body);
    const body = new DeviceModelRequest(deviceModel.body, +this.sharedVariable.getSelectedOrganisationId());
    return this.restService.post(this.DEVICEMODELURL, body, { observe: 'response' });
  }

  update(deviceModel: DeviceModel, id: number): Observable<any> {
    this.trimModel(deviceModel.body);
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
              response.body.supportedProtocol,

            ),
            response.createdAt,
            response.updatedAt,
            response.createdBy,
            response.updatedBy,
            this.userMinimalService.getUserNameFrom(response.createdBy),
            this.userMinimalService.getUserNameFrom(response.updatedBy),
          )
      )
    );
  }

  getMultiple(
    limit: number,
    offset: number,
    sort: string,
    orderOn: string,
    organizationId?: number
  ): Observable<DeviceModelResponse> {
    const body = {
        limit: limit,
        offset: offset,
        sort: sort,
        orderOn: orderOn,
        organizationId: undefined,
    };
    if (organizationId) {
      body.organizationId = organizationId;
    }
    return this.restService
      .get(this.DEVICEMODELURL, body)
      .pipe(
        map((response) => {
          return {
            data: response.data.map(
              (item: any) =>
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
            ),
            count: response.count,
          };
        })
      );
  };
  

  delete(id: number) {
    return this.restService.delete(this.DEVICEMODELURL, id);
  }

  private trimModel(deviceModel: DeviceModelBody) {
    deviceModel.id = deviceModel.id ? deviceModel.id : undefined;
    deviceModel.brandName = deviceModel.brandName ? deviceModel.brandName : undefined;
    deviceModel.modelName = deviceModel.modelName ? deviceModel.modelName : undefined;
    deviceModel.manufacturerName = deviceModel.manufacturerName ? deviceModel.manufacturerName : undefined;
    if (!deviceModel.controlledProperty || deviceModel.controlledProperty.length === 0) {
      deviceModel.controlledProperty = undefined;
    }
    if (!deviceModel.category || deviceModel.category.length === 0) {
      deviceModel.category = undefined;
    }
  }
}
