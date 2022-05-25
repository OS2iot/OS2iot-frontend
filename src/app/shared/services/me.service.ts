import { Injectable } from '@angular/core';
import {
  PermissionResponse,
  PermissionType,
  PermissionTypes,
} from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private user: UserResponse;

  constructor(private sharedVariableService: SharedVariableService) {}

  hasAccessToTargetOrganization(
    scope: OrganizationAccessScope,
    organizationId: number = this.sharedVariableService.getSelectedOrganisationId(),
    applicationId?: number
  ): boolean {
    const { permissions } = this.sharedVariableService.getUserInfo().user;

    if (
      permissions.some((p) =>
        this.hasPermissions(p, PermissionType.GlobalAdmin)
      )
    ) {
      return true;
    }

    let canWriteCallback: (
      p: PermissionResponse,
      appId: number | undefined
    ) => boolean;

    switch (scope) {
      case OrganizationAccessScope.ApplicationWrite:
        canWriteCallback = this.canWriteApplicationInTargetOrganization.bind(
          this
        );
        break;
      case OrganizationAccessScope.GatewayWrite:
        canWriteCallback = this.canWriteGatewayInTargetOrganization.bind(this);
        break;
      case OrganizationAccessScope.UserAdministrationWrite:
        canWriteCallback = this.canWriteUserInTargetOrganization.bind(this);
        break;
      default:
        // Should never happen
        return false;
    }

    return permissions.some(
      (permission) =>
        this.hasPermissions(permission, PermissionType.GlobalAdmin) ||
        (permission.organization.id === organizationId &&
          canWriteCallback(permission, applicationId))
    );
  }

  hasPermissionTypes(
    types: PermissionTypes[],
    ...targetPermissions: PermissionType[]
  ) {
    return types && this.hasPermissions({ type: types }, ...targetPermissions);
  }

  hasPermissions(
    { type }: Partial<PermissionResponse>,
    ...targetPermissions: PermissionType[]
  ) {
    return type?.some(({ type }) => targetPermissions.includes(type));
  }

  hasNotTargetPermissions(
    response: PermissionResponse,
    ...targetPermissions: PermissionType[]
  ) {
    return response.type.every(({ type }) => !targetPermissions.includes(type));
  }

  private canWriteApplicationInTargetOrganization(
    permission: PermissionResponse,
    targetAppId: number | undefined
  ): boolean {
    return (
      this.hasPermissions(
        permission,
        PermissionType.OrganizationApplicationAdmin
      ) &&
      (!targetAppId ||
        permission.applicationIds?.some((appId) => appId === targetAppId))
    );
  }

  private canWriteGatewayInTargetOrganization(
    permission: PermissionResponse
  ): boolean {
    return this.hasPermissions(
      permission,
      PermissionType.OrganizationGatewayAdmin
    );
  }

  private canWriteUserInTargetOrganization(
    permission: PermissionResponse
  ): boolean {
    return this.hasPermissions(
      permission,
      PermissionType.OrganizationUserAdmin
    );
  }

  hasGlobalAdmin() {
    const userInfo = this.sharedVariableService.getUserInfo();
    return userInfo.user.permissions.some((permission) =>
      this.hasPermissions(permission, PermissionType.GlobalAdmin)
    );
  }
}
