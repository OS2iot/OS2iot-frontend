import { Injectable } from "@angular/core";
import { ApplicationStatus, ApplicationStatusCheck } from "@applications/enums/status.enum";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApplicationsFilterService {
  public status: ApplicationStatus | "All" = "All";

  public statusCheck: ApplicationStatusCheck | "All" = "All";
  public owner: string | "All" = "All";

  private valueChanges = new BehaviorSubject<{
    status: ApplicationStatus | "All";
    statusCheck: ApplicationStatusCheck | "All";
    owner: string;
  }>({
    status: this.status,
    statusCheck: this.statusCheck,
    owner: this.owner,
  });

  filterChanges$ = this.valueChanges.asObservable();

  updateStatus(newValue: ApplicationStatus | null) {
    this.status = newValue;
    this.emitChange();
  }

  updateStatusCheck(newValue: ApplicationStatusCheck | null) {
    this.statusCheck = newValue;
    this.emitChange();
  }

  updateOwner(newValue: string) {
    this.owner = newValue;
    this.emitChange();
  }

  public resetFilter() {
    this.statusCheck = "All";
    this.status = "All";
    this.owner = "All";
    this.emitChange();
  }

  private emitChange() {
    this.valueChanges.next({ statusCheck: this.statusCheck, status: this.status, owner: this.owner });
  }
}
