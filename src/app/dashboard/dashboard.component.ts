import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private sharedVariableService: SharedVariableService
  ) {
    this.route.queryParams.subscribe(async (params) => {
      // this is used when a user is returned from Kombit login
      const jwt = params['jwt'];
      if (jwt) {
        this.authService.setSession(jwt);
        // Clear the URL from the parameter
        this.router.navigate(['/dashboard']);
      } else {
        const error = params['error'];
        if (error) {
          this.router.navigate(['/not-authorized']);
        }
      }
      await this.sharedVariableService.setUserInfo();
      await this.sharedVariableService.setOrganizationInfo();
      this.hasSomePermission = this.sharedVariableService.getHasAnyPermission();
      this.isLoadingResults = false;
    });
  }

  isLoadingResults = true;
  hasSomePermission: boolean;

  ngOnInit(): void {}
}
