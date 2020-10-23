import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SearchResultDto } from './search-results.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  isLoadingResults = true;
  query: string;
  subscription: Subscription;
  searchResults: SearchResultDto[];

  public pageLimit = 10;
  public pageTotal: number;
  public pageOffset = 0;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.pageOffset = 0;
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'];
      if (this.query != null) {
        this.pageOffset = 0;
        this.search(this.query);
      }
    });
  }

  preserveQuery(query): void {
    this.query = query;
  }

  search(query: string) {
    this.subscription = this.searchService
      .search(query, this.pageLimit, this.pageOffset * this.pageLimit)
      .subscribe((response) => {
        this.searchResults = response.data;
        this.pageTotal = Math.ceil(response.count / this.pageLimit);
        this.isLoadingResults = false;
        this.preserveQuery(query);
      });
  }

  prevPage() {
    if (this.pageOffset) {
      this.pageOffset--;
    }
    this.search(this.query);
  }

  nextPage() {
    if (this.pageOffset + 1 < this.pageTotal) {
      this.pageOffset++;
    }
    this.search(this.query);
  }

  decode(val: string): string {
    if (val === undefined) {
      return '';
    }
    return decodeURIComponent(val);
  }
}
