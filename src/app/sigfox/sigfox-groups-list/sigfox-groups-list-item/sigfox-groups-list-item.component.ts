import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPen, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';

@Component({
  selector: 'app-sigfox-groups-list-item',
  templateUrl: './sigfox-groups-list-item.component.html',
  styleUrls: ['./sigfox-groups-list-item.component.scss']
})
export class SigfoxGroupsListItemComponent implements OnInit {
  faToolbox = faToolbox;
  faEdit = faEdit;

  @Input() sigfoxGroup: SigfoxGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEditSigfoxGroup() {
    this.router.navigate([this.sigfoxGroup.sigfoxGroupData.id, 'edit-group'], { relativeTo: this.route });
  }

}
