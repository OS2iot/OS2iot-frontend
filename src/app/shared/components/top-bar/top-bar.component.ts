import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Sort } from '@shared/models/sort.model';

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
    @Input() component: false;
    @Input() showSelectedSort = true;
    @Input() backButtonTitle: string;
    @Output() selectedSortChange = new EventEmitter();
    @Output() updatePageLimit = new EventEmitter();

    constructor(
        public translate: TranslateService,
        private location: Location) {
        translate.use('da');
    }


    ngOnInit(): void { }

    changeSort(id: number) {
        this.selectedSortChange.emit(id);
    }

    routeBack(): void {
        this.location.back()
    }

    // pageLimitUpdate(value) {
    //     console.log('page limit', value);
    //     this.updatePageLimit.emit(value);
    // }
}
