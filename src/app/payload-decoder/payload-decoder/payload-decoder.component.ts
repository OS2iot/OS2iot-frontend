import { Component, OnInit } from '@angular/core';
import * as PayloadDecoderAction from '../store/payload-decoder.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payload-decoder',
  templateUrl: './payload-decoder.component.html',
  styleUrls: ['./payload-decoder.component.scss']
})
export class PayloadDecoderComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
  }
}
