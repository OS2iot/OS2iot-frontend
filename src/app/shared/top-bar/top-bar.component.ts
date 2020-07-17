import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sort } from 'src/app/models/sort';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
    @Input() title: string;
    @Input() ctaLabel: string;
    @Input() ctaRouterLink: string;
    @Input() sort: Sort[];
    @Input() pageLimit: number;
    @Input() selectedSortId: number;
    @Input() component: boolean = false;

    @Output() selectedSortChange = new EventEmitter();
    @Output() updatePageLimit = new EventEmitter();

    constructor(public translate: TranslateService) {
        translate.use('da');
    }

    ngOnInit(): void {}

    changeSort(id: number) {
        this.selectedSortChange.emit(id);
    }

    // pageLimitUpdate(value) {
    //     console.log('page limit', value);
    //     this.updatePageLimit.emit(value);
    // }
}
