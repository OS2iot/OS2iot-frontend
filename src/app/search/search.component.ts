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
  query: string;
  subscription: Subscription;
  searchResults: SearchResultDto[];
  searchResultsCount: number;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'];
      if (this.query != null) {
        this.search(this.query);
      }
    });
  }

  search(query: string) {
    this.subscription = this.searchService
      .search(query)
      .subscribe((response) => {
        this.searchResults = response.data;
        this.searchResultsCount = response.count;
      });
  }
}
