import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ServiceProfile } from '@profiles/service-profiles/service-profile.model';
import { ServiceProfileService } from '@shared/services/service-profile.service';


@Component({
  selector: 'app-service-profile-item',
  templateUrl: './service-profile-item.component.html',
  styleUrls: ['./service-profile-item.component.scss']
})
export class ServiceProfileItemComponent implements OnInit {
  @Input() serviceProfile: ServiceProfile;
  serviceId: number;
  faPen = faPen;
  faTimesCircle = faTimesCircle;
  @Output() deleteServiceProfile = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProfileService: ServiceProfileService
  ) { }

  ngOnInit(): void {
  }

  onEditServiceProfile() {
    this.router.navigate([this.serviceProfile.id, 'edit-service-profile'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.deleteServiceProfile.emit(this.serviceProfile.id);
  }
}
