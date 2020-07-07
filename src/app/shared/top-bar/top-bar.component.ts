import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  @Input() ctaLabel: string;
  @Input() ctaRouterLink: string;
  @Input() sort: any;

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
