import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {

  }

  onNewServiceProfile() {
    this.router.navigate(['new-service-profile'], { relativeTo: this.route });
  }
}
