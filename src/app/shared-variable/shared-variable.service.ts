import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedVariableService {
  constructor() {
    this.routerInfo = new BehaviorSubject<number>(0);
  }

  private selectedOrganisationId: number;
  private routerInfo: BehaviorSubject<number>;

  getValue(): Observable<number> {
    return this.routerInfo.asObservable();
  }

  setValue(newValue: number): void {
    this.setSelectedOrganisationId(newValue);
    this.routerInfo.next(newValue);
  }

  setSelectedOrganisationId(value: number) {
    localStorage.setItem('selected_organisation', value.toString());
    this.selectedOrganisationId = value;
  }

  getSelectedOrganisationId() {
    if (this.selectedOrganisationId != null) {
      return this.selectedOrganisationId;
    }

    return +localStorage.getItem('selected_organisation');
  }
}
