import { Component, OnInit, Input } from '@angular/core';
import { ServiceProfile } from '../../service-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-service-profile-item',
  templateUrl: './service-profile-item.component.html',
  styleUrls: ['./service-profile-item.component.scss']
})
export class ServiceProfileItemComponent implements OnInit {
  @Input() serviceProfile: ServiceProfile;
  @Input() index: number;
  serviceId: number;
  faPen = faPen;
  faTimesCircle = faTimesCircle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEditServiceProfile() {
    this.router.navigate([this.index, 'edit-service-profile'], { relativeTo: this.route });
  }

  onDeleteServiceProfile() {
    this.router.navigate(['/profiles']);
  }

}
