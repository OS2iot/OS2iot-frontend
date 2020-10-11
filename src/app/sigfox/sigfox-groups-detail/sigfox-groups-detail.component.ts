import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sigfox-groups-detail',
  templateUrl: './sigfox-groups-detail.component.html',
  styleUrls: ['./sigfox-groups-detail.component.scss']
})
export class SigfoxGroupsDetailComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }

  onNewGroup() {
    this.router.navigate(['edit-device-type'], { relativeTo: this.route });
  }

}
