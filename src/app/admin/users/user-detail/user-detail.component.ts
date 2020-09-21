import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@app/models/application';
import { BackButton } from '@app/models/back-button';
import { QuickActionButton } from '@app/models/quick-action-button';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from '@shared/services/application.service';
import { Subscription } from 'rxjs';
import { UserRequest, UserResponse } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: UserResponse;
  applications: Application[];
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/users',
  };
  public buttons: QuickActionButton[] = [
    {
      label: 'USERS.DELETE',
      type: 'delete',
    },
    {
      label: 'USERS.EDIT',
      type: 'edit',
    },
  ];
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('user-id');
    if (this.id > 0) {
      this.getUser(this.id);
    }
  }

  private getUser(id: number) {
    this.subscription = this.userService.getOne(id)
      .subscribe((response) => {
        this.user = response;
        //this.applications = response.applications;
      });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getUser(this.id)
      }
    });
  }

}
