import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Datatarget, DatatargetData } from 'src/app/models/datatarget';
import { Sort } from 'src/app/models/sort';
import { Subscription } from 'rxjs';
import { DataTargetType } from 'src/app/models/datatarget-type';
import { DatatargetService } from 'src/app/shared/_services/datatarget.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-datatarget-table',
  templateUrl: './datatarget-table.component.html',
  styleUrls: ['./datatarget-table.component.scss']
})
export class DatatargetTableComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  public pageOffset: number = 0;
  public pageTotal: number;

  datatargets: Datatarget[]
  private datatargetSubscription: Subscription;

  constructor(
    private datatargetService: DatatargetService, 
    public translate: TranslateService) {
        translate.use('da');
    }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getDatatarget();
  }

  getDatatarget(): void {
      this.datatargetSubscription = this.datatargetService
          .getDatatargets(
              this.pageLimit,
              this.pageOffset * this.pageLimit,
              this.selectedSortObject.dir,
              this.selectedSortObject.col
          )
          .subscribe((datatargets: DatatargetData) => {
              this.datatargets = datatargets.data;
              if (this.pageLimit) {
                  this.pageTotal = Math.ceil(datatargets.count / this.pageLimit);
              }
          });
  }

  deleteDatatarget(id: number) {
      this.datatargetService.delete(id).subscribe((response) => {
          if (response.ok && response.body.affected > 0) {
              this.getDatatarget();
          }
      });
  }

  prevPage() {
      if (this.pageOffset) this.pageOffset--;
      this.getDatatarget();
  }

  nextPage() {
      if (this.pageOffset < this.pageTotal) this.pageOffset++;
      this.getDatatarget();
  }

  ngOnDestroy() {
      // prevent memory leak by unsubscribing
      if (this.datatargetSubscription) {
          this.datatargetSubscription.unsubscribe();
      }
  }

}
