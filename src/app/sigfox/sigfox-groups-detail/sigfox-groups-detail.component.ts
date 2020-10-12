
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { Observable } from 'rxjs';


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
    private sigfoxService: SigfoxService,

  ) { }

  ngOnInit(): void { }



  onNewDeviceType() {
    this.router.navigate(['new-device-type'], { relativeTo: this.route });
  }

}
