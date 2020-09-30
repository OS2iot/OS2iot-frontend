import { Component, OnInit } from '@angular/core';
import { faBone, faIdBadge, faIdCard, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sigfox-dropdown',
  templateUrl: './sigfox-dropdown.component.html',
  styleUrls: ['./sigfox-dropdown.component.scss']
})
export class SigfoxDropdownComponent implements OnInit {
  faToolbox = faToolbox;
  faIdCard = faIdCard;
  faBone = faBone;
  constructor() { }

  ngOnInit(): void {
  }

}
