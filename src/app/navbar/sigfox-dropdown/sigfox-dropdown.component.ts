import { Component, OnInit } from '@angular/core';
import { faIdBadge, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sigfox-dropdown',
  templateUrl: './sigfox-dropdown.component.html',
  styleUrls: ['./sigfox-dropdown.component.scss']
})
export class SigfoxDropdownComponent implements OnInit {
  faUsers = faUser;
  faIdBadge = faIdBadge;
  constructor() { }

  ngOnInit(): void {
  }

}
