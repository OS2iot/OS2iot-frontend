// import { Component, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { ActivatedRoute } from '@angular/router';
// import { environment } from '@environments/environment';
// import { TranslateService } from '@ngx-translate/core';
// import { BackButton } from '@shared/models/back-button.model';

// @Component({
//   selector: 'app-multicast-list',
//   templateUrl: './multicast-list.component.html',
//   styleUrls: ['./multicast-list.component.scss'],
// })
// export class MulticastListComponent implements OnInit {
//   public pageLimit = environment.tablePageSize;
//   public title: string;
//   public backButton: BackButton = { label: '', routerLink: '' };
//   private applicationId: string;

//   constructor(
//     public translate: TranslateService,
//     private titleService: Title,
//     private route: ActivatedRoute
//   ) {
//     translate.use('da');
//   }

//   ngOnInit(): void {
//     const applicationName: string = this.route.snapshot.paramMap.get('name');
//     this.applicationId = this.route.snapshot.paramMap.get('id');
//     this.translate
//       .get(['NAV.MULTICAST', 'NAV.APPLICATIONS', 'TITLE.MULTICAST'])
//       .subscribe((translate) => {
//         this.title = translate['NAV.MULTICAST'] + ' - ' + applicationName;
//         this.backButton.label = translate['NAV.APPLICATIONS'];
//         this.titleService.setTitle(translate['TITLE.MULTICAST']);
//       });
//     this.setBackButton();
//   }

//   setBackButton() {
//     this.backButton.routerLink = ['applications', this.applicationId];
//   }

//   updatePageLimit(limit: any) {
//     console.log(limit);
//   }
// }
