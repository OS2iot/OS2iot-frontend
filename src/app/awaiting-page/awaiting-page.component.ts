import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awaiting-page',
  templateUrl: './awaiting-page.component.html',
  styleUrls: ['./awaiting-page.component.scss'],
})
export class AwaitingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (history.state.code === 200) {
    } else {
      this.router.navigate(['/not-found']);
    }
  }
}
