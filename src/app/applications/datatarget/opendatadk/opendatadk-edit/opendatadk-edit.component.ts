import { Component, Input, OnInit } from '@angular/core';
import { OpenDataDK } from '../opendatadk.model';

@Component({
  selector: 'app-opendatadk-edit',
  templateUrl: './opendatadk-edit.component.html',
  styleUrls: ['./opendatadk-edit.component.scss']
})
export class OpendatadkEditComponent implements OnInit {

  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  @Input() openDataDk: OpenDataDK;

  opendatadkModel: OpenDataDK = new OpenDataDK();

  constructor() { }

  ngOnInit(): void {
    console.log(this.openDataDk)
  }

}
