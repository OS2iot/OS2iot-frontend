import { Component, OnInit, Input } from '@angular/core';
import { ServiceProfile } from '../../service-profile.model';

@Component({
  selector: 'app-service-profile-item',
  templateUrl: './service-profile-item.component.html',
  styleUrls: ['./service-profile-item.component.scss']
})
export class ServiceProfileItemComponent implements OnInit {
  @Input() serviceProfile: ServiceProfile;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
