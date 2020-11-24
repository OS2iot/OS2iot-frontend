import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { RestService } from '@shared/services/rest.service';
import { DatatargetData, Datatarget } from './datatarget.model';
import { map } from 'rxjs/operators';
import { OpenDataDkDataset } from './opendatadk/opendatadk-dataset.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Injectable({
  providedIn: 'root'
})
export class DatatargetService {

  private dataTargetURL = 'data-target';

  constructor(
    private restService: RestService,
    private sharedVariableService: SharedVariableService) { }

  get(id: number): Observable<Datatarget> {
    return this.restService.get(this.dataTargetURL, null, id).pipe(
      map(
        (response: DatatargetResponse) => {
          const datatarget = this.mapToDatatarget(response);
          return datatarget;
        }
      )
    );
  }

  getByApplicationId(
    limit: number, offset: number, applicationId: number
  ): Observable<DatatargetData> {
    const body = {
      limit,
      offset,
      applicationId
      // sort: sort,
      // orderOn: orderOn,
      // todo tilføj når iot-314 er tilføjet
    };
    return this.restService.get(this.dataTargetURL, body);
  }

  update(datatarget: Datatarget): Observable<Datatarget> {
    this.trimModel(datatarget);
    return this.restService.put(this.dataTargetURL, datatarget, datatarget.id, { observe: 'response' }).pipe(
      map(
        (response: DatatargetResponse) => {
          const datatarget = this.mapToDatatarget(response);
          return datatarget;
        }
      )
    );
  }

  create(datatarget: Datatarget): Observable<any> {
    this.trimModel(datatarget);
    return this.restService.post(this.dataTargetURL, datatarget);
  }

  delete(id: number) {
    return this.restService.delete(this.dataTargetURL, id);
  }

  private trimModel(datatarget: Datatarget) {
    if (!datatarget.setToOpendataDk) {
      datatarget.openDataDkDataset = null;
    }
    if (datatarget.setToOpendataDk) {
      datatarget.openDataDkDataset.keywords = datatarget.openDataDkDataset?.keywordsInput?.split(',');
      datatarget.openDataDkDataset.keywordsInput = undefined;
    }
  }

  private mapToDatatarget(dataTargetResponse: DatatargetResponse): Datatarget {
    const model: Datatarget = {
      id: dataTargetResponse.id,
      name: dataTargetResponse.name,
      timeout: dataTargetResponse.timeout,
      type: dataTargetResponse.type,
      url: dataTargetResponse.url,
      authorizationHeader: dataTargetResponse.authorizationHeader,
      applicationId: dataTargetResponse.application.id,
      setToOpendataDk: dataTargetResponse?.openDataDkDataset ? true : false,
      openDataDkDataset: dataTargetResponse?.openDataDkDataset ? dataTargetResponse.openDataDkDataset : new OpenDataDkDataset(),
      createdAt: dataTargetResponse.createdAt,
      updatedAt: dataTargetResponse.updatedAt,
      createdBy: dataTargetResponse.createdBy,
      updatedBy: dataTargetResponse.updatedBy,
    };
    model.openDataDkDataset.keywordsInput = dataTargetResponse.openDataDkDataset?.keywords?.join(',');
    model.openDataDkDataset.url = this.getOpendataSharingApiUrl();
    return model;
  }

  private getOpendataSharingApiUrl(): string {
    return this.restService.createResourceUrl('open-data-dk-sharing', this.sharedVariableService.getSelectedOrganisationId());
  }

}
