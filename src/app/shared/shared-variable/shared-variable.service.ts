import { Injectable } from '@angular/core';
import { Organisation, OrganisationGetMinimalResponse } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserMinimal, UserMinimalResponse } from '@app/admin/users/user-minimal.model';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { AuthService, CurrentUserInfoResponse } from '@auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedVariableService {

  constructor(
    private authService: AuthService,
    private organisationService: OrganisationService,
    private userMinimalService: UserMinimalService) {
      this.routerInfo = new BehaviorSubject<number>(0);
  }
  private selectedOrganisationId: number;
  private routerInfo: BehaviorSubject<number>;
  private organizationInfo: Organisation[];
  private userMinimalList: UserMinimal[];

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

  setOrganizationInfo() {
    return this.organisationService
      .getMinimal()
      .pipe(
        tap((response: OrganisationGetMinimalResponse) => {
          localStorage.setItem(
            'organizationInfo',
            JSON.stringify(response.data)
          );
        })
      )
      .toPromise();
  }

  getOrganizationInfo(): Organisation[] {
    if (this.organizationInfo != null) {
      return this.organizationInfo;
    }
    this.organizationInfo = new Object(JSON.parse(localStorage.getItem('organizationInfo'))) as Organisation[];
    return this.organizationInfo;
  }

  getUsername(): string {
    return this.getUserInfo()?.user.name;
  }

  getHasAnyPermission(): boolean {
    return this.getUserInfo().user.permissions.length > 0;
  }

  isGlobalAdmin(): boolean {
    return this.getUserInfo().user.permissions.some(
      (permission) => permission.type === PermissionType.GlobalAdmin
    );
  }

  getSelectedOrganisationId(): number {
    if (this.selectedOrganisationId != null) {
      return +this.selectedOrganisationId;
    }
    return +localStorage.getItem('selected_organisation');
  }

  getUserInfo(): CurrentUserInfoResponse {
    return new Object(JSON.parse(localStorage.getItem('userInfo'))) as CurrentUserInfoResponse;
  }
}
