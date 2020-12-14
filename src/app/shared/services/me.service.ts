import { Injectable } from '@angular/core';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private user: UserResponse;

  constructor(private sharedVariableService: SharedVariableService) {}

  canWriteInTargetOrganization(id: number): boolean {
    const userInfo = this.sharedVariableService.getUserInfo();
    return userInfo.user.permissions.some((permission) => {
      return (
        permission.type === PermissionType.GlobalAdmin ||
        (permission.organization.id === id &&
          (permission.type === PermissionType.Write ||
            permission.type === PermissionType.OrganizationAdmin))
      );
    });
  }

  hasAdminAccessInTargetOrganization(id: number): boolean {
    const userInfo = this.sharedVariableService.getUserInfo();
    return userInfo.user.permissions.some((permission) => {
      return (
        permission.type === PermissionType.GlobalAdmin ||
        (permission.organization.id === id &&
          permission.type === PermissionType.OrganizationAdmin)
      );
    });
  }
  hasGlobalAdmin() {
    const userInfo = this.sharedVariableService.getUserInfo();
    return userInfo.user.permissions.some(
      (permission) => permission.type === PermissionType.GlobalAdmin
    );
  }
}
