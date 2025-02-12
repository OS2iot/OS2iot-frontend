import { Injectable } from "@angular/core";
import { UserMinimalService } from "@app/admin/users/user-minimal.service";
import { Application, ApplicationData, UpdateApplicationOrganization } from "@applications/application.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "../shared/services/rest.service";
import { ApplicationsFilterService } from "./applications-list/application-filter/applications-filter.service";
import { ApplicationStatus, ApplicationStatusCheck } from "./enums/status.enum";
import { IotDevice } from "./iot-devices/iot-device.model";

interface GetApplicationParameters {
  limit: number;
  offset: number;
  sort: string;
  orderOn: string;
  organizationId?: number;
  permissionId?: number;
  status?: ApplicationStatus;
  statusCheck?: ApplicationStatusCheck;
  owner?: string;
}

interface GetDevicesParameters {
  status?: ApplicationStatus;
  statusCheck?: ApplicationStatusCheck;
  owner?: string;
}

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  public id: number;
  public canEdit = false;
  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService,
    private filterService: ApplicationsFilterService
  ) {}

  createApplication(body: any): Observable<ApplicationData> {
    return this.restService.post("application", body, { observe: "response" });
  }

  updateApplication(body: any, id: number): Observable<ApplicationData> {
    return this.restService.put("application", body, id, {
      observe: "response",
    });
  }

  getApplication(id: number): Observable<Application> {
    return this.restService.get("application", {}, id).pipe(
      map((response: Application) => {
        response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
        response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
        return response;
      })
    );
  }
  getApplicationFilterOptions(id: number): Observable<string[]> {
    return this.restService.get(`application/${id}/filter-information`);
  }

  getApplicationsWithError(id: number): Observable<{
    total: number;
    withError: number;
    totalDevices: number;
  }> {
    return this.restService.get(`application/${id}/application-dashboard-data`);
  }

  getApplications(
    limit: number,
    offset: number,
    sort: string,
    orderOn: string,
    organizationId?: number,
    permissionId?: number
  ): Observable<ApplicationData> {
    const body: GetApplicationParameters = {
      limit,
      offset,
      sort,
      orderOn,
      statusCheck: this.filterService.statusCheck === "All" ? null : this.filterService.statusCheck,
      status: this.filterService.status === "All" ? null : this.filterService.status,
      owner: this.filterService.owner === "All" ? null : this.filterService.owner,
    };
    if (permissionId) {
      body.permissionId = permissionId;
      return this.restService.get(`permission/${permissionId}/applications`, body);
    } else if (organizationId) {
      body.organizationId = organizationId;
      return this.restService.get("application", body);
    }
    return this.restService.get("application", body);
  }

  getApplicationDevices(organizationId?: number): Observable<IotDevice[]> {
    const body: GetDevicesParameters = {
      statusCheck: this.filterService.statusCheck === "All" ? null : this.filterService.statusCheck,
      status: this.filterService.status === "All" ? null : this.filterService.status,
      owner: this.filterService.owner === "All" ? null : this.filterService.owner,
    };

    return this.restService.get(`application/${organizationId}/iot-devices-org`, body);
  }

  getApplicationsByOrganizationId(organizationId: number): Observable<ApplicationData> {
    const body = {
      organizationId,
    };
    return this.restService.get("application", body);
  }

  deleteApplication(id: number) {
    return this.restService.delete("application", id);
  }

  updateApplicationOrganization(body: UpdateApplicationOrganization, id: number): Observable<Application> {
    return this.restService.put("application/updateApplicationOrganization", body, id, {
      observe: "response",
    });
  }
}
