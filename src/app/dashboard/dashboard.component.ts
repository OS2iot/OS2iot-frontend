import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const jwt = params['jwt'];
      if (jwt) {
        this.authService.setSession(jwt);
        // Clear the URL from the parameter
        this.router.navigate(['/dashboard']);
      }
      1;
      this.authService.me().subscribe((response) => {
        this.hasSomePermission = response.user.permissions.length > 0;
        this.isLoadingResults = false;
      });
    });
  }

  isLoadingResults = true;
  hasSomePermission: boolean;

  ngOnInit(): void {}
}
