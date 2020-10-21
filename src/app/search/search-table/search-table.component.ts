import { Component, Input, OnInit } from '@angular/core';
import { SearchResultDto } from '../search-results.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit {
  @Input() searchResults: SearchResultDto[];
  @Input() searchResultsCount: number;

  constructor() {
    console.log('table');
  }

  ngOnInit(): void {}
}
