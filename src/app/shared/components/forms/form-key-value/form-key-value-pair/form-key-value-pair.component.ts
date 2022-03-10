import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

interface KeyValue {
  key?: string;
  value?: string;
}

@Component({
  selector: 'app-form-key-value-pair',
  templateUrl: './form-key-value-pair.component.html',
  styleUrls: ['./form-key-value-pair.component.scss'],
})
export class FormKeyValuePairComponent implements OnInit {
  @Input() id: number;
  @Input() pair: KeyValue;
  @HostBinding('class.row') rowClass = false;
  @Output() deletePair: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.rowClass = true;
  }
}
