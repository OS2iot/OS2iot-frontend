import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // TODO: Is search component used, and why does it even have a top bar?
  canEdit = false;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute
  ) {}
  query: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'];
    });
  }

  decode(val: string): string {
    if (val === undefined) {
      return '';
    }
    return decodeURIComponent(val);
  }
}
