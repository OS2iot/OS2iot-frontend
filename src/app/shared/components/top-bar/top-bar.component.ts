import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Sort } from '@shared/models/sort.model';
import { ActivatedRoute, Router } from '@angular/router';

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
    @Input() searchQuery: string;
    @Output() selectedSortChange = new EventEmitter();
    @Output() updatePageLimit = new EventEmitter();

    constructor(
        public translate: TranslateService,
        private location: Location,
        private router: Router,
    ) {
        translate.use('da');
    }


    ngOnInit(): void {}

    changeSort(id: number) {
        this.selectedSortChange.emit(id);
    }

    routeBack(): void {
        this.location.back();
    }

    search(value: string): void {
        // Redirect to search results page and do search
        const urlEncoded = encodeURIComponent(value)
        this.router.navigate(['/search'], { queryParams: { q: urlEncoded } } );
    }

    decode(val: string): string {
        if (val === undefined) {
            return "";
        }
        return decodeURIComponent(val)
    }

    // pageLimitUpdate(value) {
    //     console.log('page limit', value);
    //     this.updatePageLimit.emit(value);
    // }
}
