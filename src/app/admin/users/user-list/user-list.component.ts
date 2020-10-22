import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Sort } from '@shared/models/sort.model';
import { Subscription } from 'rxjs';
import { UserResponse } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {

  public pageLimit = 10;
  public sort: Sort[] = [
    {
      id: 1,
      dir: 'ASC',
      col: 'updatedAt',
      label: 'SORT.UPDATED-ASCENDING',
    },
    {
      id: 2,
      dir: 'DESC',
      col: 'updatedAt',
      label: 'SORT.UPDATED-DESCENDING',
    },
    {
      id: 3,
      dir: 'ASC',
      col: 'createdAt',
      label: 'SORT.CREATED-ASCENDING',
    },
    {
      id: 4,
      dir: 'DESC',
      col: 'createdAt',
      label: 'SORT.CREATED-DESCENDING',
    },
    {
      id: 5,
      dir: 'ASC',
      col: 'name',
      label: 'SORT.NAME-ASCENDING',
    },
    {
      id: 6,
      dir: 'DESC',
      col: 'name',
      label: 'SORT.NAME-DESCENDING',
    },
  ];
  public selectedSortId = 1;
  public selectedSortObject: Sort = {
    id: 6,
    dir: 'DESC',
    col: 'name',
    label: 'SORT.NAME-DESCENDING',
  };

  subscription: Subscription;
  users: UserResponse[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getUsers() {
    this.subscription = this.userService.getMultiple()
      .subscribe(
        (response) => {
          this.users = response.data;
        });
  }

  updatePageLimit(limit: any) {
    console.log(limit);
  }

  changeSort(sortId: number) {
    for (let i = 0; i < this.sort.length; i++) {
      const elem = this.sort[i];
      if (elem.id === sortId) {
        this.selectedSortObject = elem;
      }
    }
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
