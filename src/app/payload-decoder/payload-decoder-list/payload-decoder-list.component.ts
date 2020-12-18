import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';

@Component({
    selector: 'app-payload-decoder-list',
    templateUrl: './payload-decoder-list.component.html',
    styleUrls: ['./payload-decoder-list.component.scss']
})
export class PayloadDecoderListComponent implements OnInit {

    constructor(
        public translate: TranslateService,
        private titleService: Title
    ) {
        translate.use('da')
     }

    ngOnInit(): void {
        this.translate.get(['TITLE.PAYLOADDECODER'])
            .subscribe(translations => {
                this.titleService.setTitle(translations['TITLE.PAYLOADDECODER']);
      });
    }

}
