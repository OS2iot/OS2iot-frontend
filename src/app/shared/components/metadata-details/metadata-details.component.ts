import { Component, Input, OnInit } from '@angular/core';
import { ApplicationMetadata } from '@applications/application.model';
import { toPascalKebabCase } from '@shared/helpers/string.helper';
import { CustomTableDatePipe } from '@shared/pipes/custom-date.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-metadata-details',
  templateUrl: './metadata-details.component.html',
  styleUrls: ['./metadata-details.component.scss'],
})
export class MetadataDetailsComponent implements OnInit {
  @Input() metadataJson: string;
  metadata: ApplicationMetadata;
  entries = Object.entries;
  toPascalKebabCase = toPascalKebabCase;

  constructor(private datePipe: CustomTableDatePipe) {}

  ngOnInit(): void {
    this.metadata = JSON.parse(this.metadataJson);
  }

  formatValue(value: unknown): unknown {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
    } else if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      if (moment(value, moment.ISO_8601, true).isValid()) {
        return this.datePipe.transform(value);
      }
    }

    return value;
  }
}
