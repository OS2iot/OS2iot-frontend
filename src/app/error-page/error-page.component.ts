import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorPageMessage } from '@shared/models/error-message.model';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: any;

  constructor() {
  }

  ngOnInit() {
    if (history.state.code === 401) {
      this.errorMessage = history.state;
    } else {
      this.errorMessage = {
        message: 'Page not found',
        code: 404
      }
    }
  }
}

