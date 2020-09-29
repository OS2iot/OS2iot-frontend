import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { Papa } from 'ngx-papaparse';

@Component({
    selector: 'app-iot-devices-list',
    templateUrl: './iot-devices-list.component.html',
    styleUrls: ['./iot-devices-list.component.scss'],
})
export class IotDevicesListComponent implements OnInit {
    public pageLimit: number = 10;
    public sort: Sort[] = [
        {
            id: 1,
            dir: 'ASC',
            col: 'name',
            label: 'SORT.NAME-ASCENDING',
        },
        {
            id: 2,
            dir: 'DESC',
            col: 'name',
            label: 'SORT.NAME-DESCENDING',
        },
        {
            id: 3,
            dir: 'ASC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-ASCENDING',
        },
        {
            id: 4,
            dir: 'DESC',
            col: 'updatedAt',
            label: 'SORT.UPDATED-DESCENDING',
        },
        {
            id: 5,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.CREATED-ASCENDING',
        },
        {
            id: 6,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.CREATED-DESCENDING',
        },
        {
            id: 7,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.APPLICATION-ASCENDING',
        },
        {
            id: 8,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.APPLICATION-DESCENDING',
        },
        {
            id: 9,
            dir: 'ASC',
            col: 'createdAt',
            label: 'SORT.BATTERY-ASCENDING',
        },
        {
            id: 10,
            dir: 'DESC',
            col: 'createdAt',
            label: 'SORT.BATTERY-DESCENDING',
        },
    ];
    public selectedSortId: number = 1;
    public selectedSortObject: Sort = {
        id: 1,
        dir: 'ASC',
        col: 'name',
        label: 'SORT.NAME-ASCENDING',
    };

    constructor(
        public translate: TranslateService,
        private papa: Papa) {
        translate.use('da');
    }

    ngOnInit(): void { }

    updatePageLimit(limit: any) {
        console.log(limit);
    }

    changeSort(sortId: number) {
        for (let i = 0; i < this.sort.length; i++) {
            const elem = this.sort[i];
            if (elem.id == sortId) {
                this.selectedSortObject = elem;
            }
        }
    }

    ConvertCSVtoJSON() {
        console.log(JSON.stringify(this.test));
        // let csvData = '"Hello","World!"';
        // this.papa.parse(csvData, {
        //   complete: (results) => {
        //     console.log('Parsed  : ', results.data[0][1]);
        //     // console.log(results.data.length);
        //   }
        // });
    }

    test = [];
    handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event: any) => {
            var csv = event.target.result; // Content of CSV file
            this.papa.parse(csv, {
                skipEmptyLines: true,
                header: true,
                complete: (results) => {
                    for (let i = 0; i < results.data.length; i++) {
                        let orderDetails = {
                            order_id: results.data[i].Address,
                            age: results.data[i].Age
                        };
                        this.test.push(orderDetails);
                    }
                    // console.log(this.test);
                    console.log('Parsed: k', results.data);
                }
            });
        }
    }
}
