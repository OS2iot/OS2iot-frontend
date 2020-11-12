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
  private gotWritePermission: boolean;
  private gotAnyPermission: boolean;
  private routerInfo: BehaviorSubject<number>;
  private username: string;

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
          const hasSomePermission = response.user.permissions.length > 0;
          this.gotAnyPermission = hasSomePermission;
          localStorage.setItem(
            'has_any_permission',
            hasSomePermission.toString()
          );

          this.username = response.user.name;
          localStorage.setItem('username', response.user.name);

          localStorage.setItem(
            'permissions',
            JSON.stringify(response.user.permissions)
          );
        })
      )
      .toPromise();
  }

  getUsername(): string {
    if (this.username != null) {
      return this.username;
    }
    return localStorage.getItem('username');
  }

  getHasAnyPermission(): boolean {
    if (this.gotAnyPermission != null) {
      return this.gotAnyPermission;
    }
    return JSON.parse(localStorage.getItem('has_any_permission'));
  }

  getHasWritePermission(): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions'));

    return permissions.some(
      (permission) =>
        permission.type === PermissionType.GlobalAdmin ||
        (permission.organization?.id === +this.selectedOrganisationId &&
          (permission.type === PermissionType.OrganizationAdmin ||
            permission.type === PermissionType.Write))
    );
  }

  isGlobalAdmin(): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions'));

    return permissions.some(
      (permission) => permission.type === PermissionType.GlobalAdmin
    );
  }

  getSelectedOrganisationId() {
    if (this.selectedOrganisationId != null) {
      return this.selectedOrganisationId;
    }

    return +localStorage.getItem('selected_organisation');
  }
}
