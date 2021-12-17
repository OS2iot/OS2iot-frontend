import { Injectable } from '@angular/core';
import { PermissionType, PermissionResponse } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private user: UserResponse;

  constructor(private sharedVariableService: SharedVariableService) {}

  hasAccessToTargetOrganization(
    scope: OrganizationAccessScope,
    id: number = this.sharedVariableService.getSelectedOrganisationId()
  ): boolean {
    const { permissions } = this.sharedVariableService.getUserInfo().user;

    if (permissions.some((p) => p.type === PermissionType.GlobalAdmin)) {
      return true;
    }

    let canWriteCallback: (p: PermissionResponse) => boolean;

    switch (scope) {
      case OrganizationAccessScope.ApplicationWrite:
        canWriteCallback = this.canWriteApplicationInTargetOrganization;
        break;
      case OrganizationAccessScope.GatewayWrite:
        canWriteCallback = this.canWriteGatewayInTargetOrganization;
        break;
      case OrganizationAccessScope.UserAdministrationWrite:
        canWriteCallback = this.canWriteUserInTargetOrganization;
        break;
      default:
        // Should never happen
        return false;
    }

    return permissions.some(
      (permission) =>
        permission.type === PermissionType.GlobalAdmin ||
        (permission.organization.id === id && canWriteCallback(permission))
    );
  }

  private canWriteApplicationInTargetOrganization(
    permission: PermissionResponse
  ): boolean {
    return permission.type === PermissionType.OrganizationApplicationAdmin;
  }

  private canWriteGatewayInTargetOrganization(permission: PermissionResponse): boolean {
    return permission.type === PermissionType.OrganizationGatewayAdmin;
  }

  private canWriteUserInTargetOrganization(permission: PermissionResponse): boolean {
    return permission.type === PermissionType.OrganizationUserAdmin;
  }

  hasGlobalAdmin() {
    const userInfo = this.sharedVariableService.getUserInfo();
    return userInfo.user.permissions.some(
      (permission) => permission.type === PermissionType.GlobalAdmin
    );
  }
}
