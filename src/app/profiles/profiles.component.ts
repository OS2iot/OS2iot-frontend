import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  constructor(
    private loggingService: LoggingService,
  ) { }

  ngOnInit(): void {
    this.loggingService.printLog('Profiles tapped');
  }

}
