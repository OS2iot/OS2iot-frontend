import { Component, Input, OnInit } from '@angular/core';
import { OpenDataDkDataset } from '../opendatadk-dataset.model';

@Component({
  selector: 'app-opendatadk-edit',
  templateUrl: './opendatadk-edit.component.html',
  styleUrls: ['./opendatadk-edit.component.scss']
})
export class OpendatadkEditComponent implements OnInit {

  public errorMessages: any;
  @Input() errorFields: string[];
  @Input() formFailedSubmit = false;
  @Input() openDataDk: OpenDataDkDataset;

  opendatadkModel: OpenDataDK = new OpenDataDK();

  constructor() { }

  ngOnInit(): void {
    console.log(this.openDataDk)
  }

}
