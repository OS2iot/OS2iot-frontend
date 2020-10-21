import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchResultDto } from '../search-results.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit {
  @Input() searchResults: SearchResultDto[];
  @Input() pageTotal: number;
  @Input() pageOffset: number;
  @Output() prevPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  gotoPrevPage() {
    this.prevPage.emit();
  }

  gotoNextPage() {
    this.nextPage.emit();
  }
}
