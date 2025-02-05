import { Injectable } from "@angular/core";
import { UserMinimalService } from "@app/admin/users/user-minimal.service";
import { Application, ApplicationData, UpdateApplicationOrganization } from "@applications/application.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "../shared/services/rest.service";

interface GetApplicationParameters {
  limit: number;
  offset: number;
  sort: string;
  orderOn: string;
  organizationId?: number;
  permissionId?: number;
}

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  public id: number;
  public canEdit = false;
  constructor(private restService: RestService, private userMinimalService: UserMinimalService) {}

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
