import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {
  @Input() csvRecords = [];
  isLoading = false;

  constructor(private papa: Papa) {
    const csvData = '"Hello","World!"';


    this.papa.parse(csvData, {
      complete: (result) => {
        console.log('Parsed: ', result);
      }
    });
  }

  ngOnInit(): void {
  }
  handleDropedFile(evt) {
    this.isLoading = true;
    const files = evt.target.files;  // File List object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      let csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: results => {
          const data = results.data;
          this.csvRecords = data;
          const total = this.csvRecords.length;
          if (total === 0) {
            this.isLoading = false;
            alert('no data in csv');
            return;
          }
          return this.csvRecords;
        }
      }
      );
      console.log(this.csvRecords);
      this.isLoading = false;
    }
  }
}
