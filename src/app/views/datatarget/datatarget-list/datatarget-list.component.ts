import { Component, OnInit, Input } from '@angular/core';
import { Sort } from 'src/app/models/sort';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';
import { Datatarget } from 'src/app/models/datatarget';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'a[app-datatarget-list]',
  templateUrl: './datatarget-list.component.html',
  styleUrls: ['./datatarget-list.component.scss']
})
export class DatatargetListComponent implements OnInit {

  public pageLimit: number = 10;
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
  public selectedSortId: number = 1;
  public selectedSortObject: Sort = {
      id: 6,
      dir: 'DESC',
      col: 'name',
      label: 'SORT.NAME-DESCENDING',
  };
  public title: string;

  public backButton: BackButton = {label: '', routerLink: '/mine-applikationer'};
  public datatarget: Datatarget;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,) {
    translate.use('da');
   }

  ngOnInit(): void {
    const applikationName: string = this.route.snapshot.paramMap.get('name'); 
    this.translate.get(["NAV.DATATARGET"])
        .subscribe((translate) => {
            this.title = translate['NAV.DATATARGET'] + ' - ' + applikationName
        })
  }

  updatePageLimit(limit: any) {
    console.log(limit);
  }

  changeSort(sortId: number) {
      for (let i = 0; i < this.sort.length; i++) {
          const elem = this.sort[i];
          if (elem.id == sortId) {
              this.selectedSortObject = elem;
          }
      }
  }

}
