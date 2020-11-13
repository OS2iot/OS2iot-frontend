import { Injectable } from '@angular/core';
import { PermissionType } from '@app/admin/permission/permission.model';
import { AuthService, CurrentUserInfoResponse } from '@auth/auth.service';
import { timeStamp } from 'console';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedVariableService {
  constructor(private authService: AuthService) {
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

  setUserInfo() {
    return this.authService
      .me()
      .pipe(
        tap((response: CurrentUserInfoResponse) => {
          localStorage.setItem(
            'userInfo',
            JSON.stringify(response)
          );
        })
      )
      .toPromise();
  }

  getUsername(): string {
    return this.getUserInfo().user.name;
  }

  getHasAnyPermission(): boolean {
    return this.getUserInfo().user.permissions.length > 0;
  }

  getHasWritePermission(): boolean {
    const permissions = this.getUserInfo().user.permissions;
    return permissions.some(
      (permission) =>
        permission.type === PermissionType.GlobalAdmin ||
        (permission.organization?.id === +this.selectedOrganisationId &&
          (permission.type === PermissionType.OrganizationAdmin ||
            permission.type === PermissionType.Write))
    );
  }

  isGlobalAdmin(): boolean {
    return this.getUserInfo().user.permissions.some(
      (permission) => permission.type === PermissionType.GlobalAdmin
    );
  }

  getSelectedOrganisationId() {
    if (this.selectedOrganisationId != null) {
      return this.selectedOrganisationId;
    }
    return +localStorage.getItem('selected_organisation');
  }

  getUserInfo(): CurrentUserInfoResponse {
    return new Object(JSON.parse(localStorage.getItem('userInfo'))) as CurrentUserInfoResponse;
  }
}
