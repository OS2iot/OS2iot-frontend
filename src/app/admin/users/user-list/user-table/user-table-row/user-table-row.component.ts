import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/admin/users/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tr[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.scss']
})
export class UserTableRowComponent implements OnInit {

  @Input() user: User;
  @Output() deleteUser = new EventEmitter();
  private alertMessage: string;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
  }

  clickDelete() {
    this.deleteUser.emit(this.user.id);
  }

  navigateToEditPage() {
    this.router.navigate(['payload-decoder-edit', this.user.id]);
  }

}
