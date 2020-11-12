import { Injectable } from '@angular/core';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { AuthService, CurrentUserInfoResponse } from '@auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private user: UserResponse;

  constructor(
    private authService: AuthService
  ) {}

  canWriteInTargetOrganization(id: number): Observable<boolean> {
    return new Observable(
      (observer) => {
        this.authService.me()
          .subscribe( 
            (response: CurrentUserInfoResponse) => {
              let canEdit = false;
              response.user.permissions.forEach(
                permission => {
                  if (permission.type === PermissionType.GlobalAdmin) {
                    canEdit = true;
                  }
                  else if (permission.organization.id === id && PermissionType.Write) 
                  {
                    canEdit = true;
                  }
                });
              observer.next(canEdit);
            }
          );
      }
    )
  }
}