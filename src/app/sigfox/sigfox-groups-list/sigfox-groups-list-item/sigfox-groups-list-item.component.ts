import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPen, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-sigfox-groups-list-item',
  templateUrl: './sigfox-groups-list-item.component.html',
  styleUrls: ['./sigfox-groups-list-item.component.scss']
})
export class SigfoxGroupsListItemComponent implements OnInit {
  faToolbox = faToolbox;
  faEdit = faEdit;
  @Input() sigfoxGroup: SigfoxGroup;
  public canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    console.log(this.sigfoxGroup);
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  onEditSigfoxGroup() {
    this.router.navigate([this.sigfoxGroup.sigfoxGroupData.id, 'edit-group'], { relativeTo: this.route });
  }

}
