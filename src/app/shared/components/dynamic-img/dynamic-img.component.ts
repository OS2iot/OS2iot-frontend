import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-img',
  templateUrl: './dynamic-img.component.html',
  styleUrls: ['./dynamic-img.component.scss']
})
export class DynamicImgComponent implements OnInit {

  @Input() image: string;
  @Input() altText: string;
  imagePath: string;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.translate.currentLang === 'da') {
      this.imagePath = 'assets/images/' + this.image + '-danish.png';
    } else {
      this.imagePath = 'assets/images/' + this.image + '-english.png';
    }
  }


}
