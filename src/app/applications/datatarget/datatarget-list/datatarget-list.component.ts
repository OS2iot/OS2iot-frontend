import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Datatarget } from '../datatarget.model';
import { BackButton } from '@shared/models/back-button.model';


@Component({
    selector: 'a[app-datatarget-list]',
    templateUrl: './datatarget-list.component.html',
    styleUrls: ['./datatarget-list.component.scss']
})
export class DatatargetListComponent implements OnInit {

    public pageLimit = 10;
    public title: string;

    public backButton: BackButton = { label: '', routerLink: '/applikationer' };
    public datatarget: Datatarget;

    constructor(
        public translate: TranslateService,
        private route: ActivatedRoute,) {
        translate.use('da');
    }

    ngOnInit(): void {
        const applikationName: string = this.route.snapshot.paramMap.get('name');
        this.translate.get(["NAV.DATATARGET"])
            .subscribe((translate) => {
                this.title = translate['NAV.DATATARGET'] + ' - ' + applikationName;
            });
    }

    updatePageLimit(limit: any) {
        console.log(limit);
    }
}
