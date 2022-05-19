import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/admin/users/user.service';
import { WelcomeDialogModel } from '@shared/models/dialog.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
})
export class WelcomeDialogComponent implements OnInit {
  dontShowAgain = false;

  constructor(
    private dialog: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: WelcomeDialogModel,
    private sharedVariableService: SharedVariableService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  close(): void {
    if (this.dontShowAgain) {
      const userResponse = this.sharedVariableService.getUserInfo();
      this.userService.hideWelcome(userResponse.user.id).subscribe(
        (_response) => {},
        (_error) => {}
      );
    }

    this.dialog.close();
  }
}
