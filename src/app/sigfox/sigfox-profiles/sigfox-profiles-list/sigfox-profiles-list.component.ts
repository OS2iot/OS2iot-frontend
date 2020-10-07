import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sigfox-profiles-list',
  templateUrl: './sigfox-profiles-list.component.html',
  styleUrls: ['./sigfox-profiles-list.component.scss']
})
export class SigfoxProfilesListComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }

  onNewGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
