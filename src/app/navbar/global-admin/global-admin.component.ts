import { Component, OnInit } from '@angular/core';
import { PermissionType } from '@app/admin/permission/permission.model';
import { UserResponse } from '@app/admin/users/user.model';
import { AuthService } from '@app/auth/auth.service';
import { faGlobe, faUsers, faIdBadge, faSitemap, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-global-admin',
  templateUrl: './global-admin.component.html',
  styleUrls: ['./global-admin.component.scss']
})
export class GlobalAdminComponent implements OnInit {
  faGlobe = faGlobe;
  faUsers = faUsers;
  faIdBadge = faIdBadge;
  faSitemap = faSitemap;
  faUser = faUser;

  public user: UserResponse;
  public isGlobalAdmin = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.me()
      .subscribe(
        (response) => {
          this.user = response.user;
          this.findGlobalAdminPermission(response.user);
        });
  }

  findGlobalAdminPermission(user: UserResponse) {
    this.isGlobalAdmin = this.user.permissions.some(x => x.type === PermissionType.GlobalAdmin);
  }

}
