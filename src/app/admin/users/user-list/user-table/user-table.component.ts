import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@shared/models/sort.model';
import { Subscription } from 'rxjs';
import { UserResponse } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  @Input() users: UserResponse[];
  public pageOffset = 0;
  public pageTotal: number;


  constructor(

  ) { }

  ngOnInit(): void {

  }




}
