import { Component, OnInit } from '@angular/core';
import * as PayloadDecoderAction from '../store/payload-decoder.actions';
import { Store } from '@ngrx/store';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-payload-decoder',
  templateUrl: './payload-decoder.component.html',
  styleUrls: ['./payload-decoder.component.scss']
})
export class PayloadDecoderComponent implements OnInit {

  constructor(
    private loggingService: LoggingService,
  ) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
  }
}
