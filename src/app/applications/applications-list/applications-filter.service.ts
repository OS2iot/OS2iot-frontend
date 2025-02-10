import { Injectable } from "@angular/core";
import { Application } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { ApplicationState, ApplicationStatus } from "@applications/enums/status.enum";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApplicationsFilterService {
  private status: ApplicationStatus | "All" = "All";

  private state: ApplicationState | "All" = "All";
  private owner: string | "All" = "All";

  private valueChanges = new BehaviorSubject<{
    status: ApplicationStatus | "All";
    state: ApplicationState | "All";
    owner: string;
  }>({
    status: this.status,
    state: this.state,
    owner: this.owner,
  });

  filterChanges$ = this.valueChanges.asObservable();

  updateStatus(newValue: ApplicationStatus | null) {
    this.status = newValue;
    this.emitChange();
  }

  updateState(newValue: ApplicationState | null) {
    this.state = newValue;
    this.emitChange();
  }

  updateOwner(newValue: string) {
    this.owner = newValue;
    this.emitChange();
  }

  public resetFilter() {
    this.state = "All";
    this.status = "All";
    this.owner = "All";
    this.emitChange();
  }

  private emitChange() {
    this.valueChanges.next({ state: this.state, status: this.status, owner: this.owner });
  }

  public SortApplications(applications: Application[]) {
    return applications.filter(
      application =>
        (this.owner == "All" || application.owner === this.owner) &&
        (this.state == "All" || application.status === this.state) &&
        (this.state == "All" || application.status === this.state)
    );
  }

  private checkApplicationStatus() {
    //   this.applicationService
    //     .getApplications(100000, 0, "asc", "id")
    //     .pipe(
    //       map(applicationData => {
    //         const filteredApplications = this.filterService.SortApplications(applicationData.data as Application[]);
    //         return filteredApplications.map(app => app.id);
    //       })
    //     )
    //     .subscribe(mappedCoordinates => {
    //       this.applicationService.getApplicationDevicesForMap(mappedCoordinates).subscribe(data => {
    //         this.devices = data;
    //         this.mapDevicesToCoordinateList();
    //       });
    //     });
    // }
    this.applicationService.getApplicationDevicesForMap;
  }

  constructor(private applicationService: ApplicationService) {}

  getAppLicationIds(): Observable<{ label: string; value: string }[]> {
    return this.applicationService.getApplications(1000000, 0, "asc", "id").pipe(
      map(applicationData =>
        applicationData.data.map(data => ({
          label: data.owner,
          value: data.owner,
        }))
      )
    );
  }

  getOwnerOptions(): Observable<{ label: string; value: string }[]> {
    return this.applicationService.getApplications(1000000, 0, "asc", "id").pipe(
      map(applicationData =>
        applicationData.data.map(data => ({
          label: data.owner,
          value: data.owner,
        }))
      )
    );
  }
}
