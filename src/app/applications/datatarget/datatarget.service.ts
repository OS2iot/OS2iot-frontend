import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DatatargetResponse } from "@applications/datatarget/datatarget-response.model";
import { RestService } from "@shared/services/rest.service";
import { DatatargetData, Datatarget, OddkMailInfo } from "./datatarget.model";
import { map } from "rxjs/operators";
import { OpenDataDkDataset } from "./opendatadk/opendatadk-dataset.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { UserMinimalService } from "@app/admin/users/user-minimal.service";

@Injectable({
  providedIn: "root",
})
export class DatatargetService {
  private dataTargetURL = "data-target";

  constructor(
    private restService: RestService,
    private sharedVariableService: SharedVariableService,
    private userMinimalService: UserMinimalService
  ) {}

  get(id: number): Observable<Datatarget> {
    return this.restService.get(this.dataTargetURL, null, id).pipe(
      map((response: DatatargetResponse) => {
        const datatarget = this.mapToDatatarget(response);
        return datatarget;
      })
    );
  }

  getByApplicationId(limit: number, offset: number, applicationId: number): Observable<DatatargetData> {
    const body = {
      limit,
      offset,
      applicationId,
      // sort: sort,
      // orderOn: orderOn,
      // todo tilføj når iot-314 er tilføjet
    };
    return this.restService.get(this.dataTargetURL, body);
  }

  update(datatarget: Datatarget): Observable<Datatarget> {
    this.trimModel(datatarget);
    return this.restService.put(this.dataTargetURL, datatarget, datatarget.id, { observe: "response" }).pipe(
      map((response: DatatargetResponse) => {
        const datatarget = this.mapToDatatarget(response);
        return datatarget;
      })
    );
  }

  create(datatarget: Datatarget): Observable<Datatarget> {
    this.trimModel(datatarget);
    return this.restService.post(this.dataTargetURL, datatarget).pipe(
      map((response: DatatargetResponse) => {
        const datatarget = this.mapToDatatarget(response);
        return datatarget;
      })
    );
  }

  delete(id: number) {
    return this.restService.delete(this.dataTargetURL, id);
  }

  private trimModel(datatarget: Datatarget) {
    if (!datatarget.setToOpendataDk) {
      datatarget.openDataDkDataset = null;
    }
  }

  private mapToDatatarget(dataTargetResponse: DatatargetResponse): Datatarget {
    const model: Datatarget = {
      id: dataTargetResponse.id,
      name: dataTargetResponse.name,
      timeout: dataTargetResponse.timeout,
      type: dataTargetResponse.type,
      url: dataTargetResponse.url,
      tenant: dataTargetResponse.tenant,
      context: dataTargetResponse.context,
      authorizationHeader: dataTargetResponse.authorizationHeader,
      tokenEndpoint: dataTargetResponse.tokenEndpoint,
      clientId: dataTargetResponse.clientId,
      clientSecret: dataTargetResponse.clientSecret,
      applicationId: dataTargetResponse.application.id,
      setToOpendataDk: dataTargetResponse?.openDataDkDataset ? true : false,
      openDataDkDataset: dataTargetResponse?.openDataDkDataset
        ? dataTargetResponse.openDataDkDataset
        : new OpenDataDkDataset(),
      mqttPort: dataTargetResponse.mqttPort,
      mqttTopic: dataTargetResponse.mqttTopic,
      mqttQos: dataTargetResponse.mqttQos,
      mqttUsername: dataTargetResponse.mqttUsername,
      mqttPassword: dataTargetResponse.mqttPassword,
      createdAt: dataTargetResponse.createdAt,
      updatedAt: dataTargetResponse.updatedAt,
      createdBy: dataTargetResponse.createdBy,
      updatedBy: dataTargetResponse.updatedBy,
      createdByName: this.userMinimalService.getUserNameFrom(dataTargetResponse.createdBy),
      updatedByName: this.userMinimalService.getUserNameFrom(dataTargetResponse.updatedBy),
      lastMessageDate: dataTargetResponse.lastMessageDate,
      hasRecentErrors: dataTargetResponse.hasRecentErrors,
    };
    model.openDataDkDataset.keywordsInput = dataTargetResponse.openDataDkDataset?.keywords?.join(", ");
    model.openDataDkDataset.url = this.getOpendataSharingApiUrl();
    return model;
  }

  getOpendataSharingApiUrl(): string {
    return this.restService.createResourceUrl(
      "open-data-dk-sharing",
      this.sharedVariableService.getSelectedOrganisationId()
    );
  }

  getOpenDataDkRegistered(organizationId: number): Observable<boolean> {
    return this.restService.get(this.dataTargetURL + "/getOpenDataDkRegistered", undefined, organizationId);
  }
  updateOpenDataDkRegistered(organizationId: number): Observable<boolean> {
    return this.restService.put(this.dataTargetURL + "/updateOpenDataDkRegistered", undefined, organizationId);
  }
  sendOpenDataDkMail(mailDto: OddkMailInfo): Observable<boolean> {
    mailDto.sharingUrl = this.getOpendataSharingApiUrl();
    return this.restService.post(this.dataTargetURL + "/sendOpenDataDkMail", mailDto);
  }
}
