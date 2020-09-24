import { Component, OnInit } from '@angular/core';
import { faGlobe, faUsers, faIdBadge, faSitemap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-global-admin',
  templateUrl: './global-admin.component.html',
  styleUrls: ['./global-admin.component.scss']
})
export class GlobalAdminComponent implements OnInit {
  faGlobe = faGlobe;
  faUsers = faUsers;
  faIdBadge = faIdBadge;
  faSitemap = faSitemap;
  constructor() { }

  ngOnInit(): void {
  }

}
