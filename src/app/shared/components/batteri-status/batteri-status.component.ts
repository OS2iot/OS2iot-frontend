import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-batteri-status',
  templateUrl: './batteri-status.component.html',
  styleUrls: ['./batteri-status.component.scss']
})
export class BatteriStatusComponent implements OnInit {
  @Input() public color: string;
  @Input() public percentage: number;
  arrayColor = [];
  totalPin = 10;
  pinColor = 'red';

  constructor() { }

  ngOnInit() {
    this.renderArrayColor();
    console.log(this.arrayColor);
  }

  renderArrayColor() {
    const part = 100 / this.totalPin;
    let currentLevel = 0 + part;
    for (let i = 0; i < this.totalPin; i++) {
      if (this.percentage >= currentLevel) {
        this.arrayColor.push({ full: true, color: this.color, width: '70px' });
        currentLevel += part;
      } else {
        const newWidth = ((this.percentage - currentLevel + part) * 7) / 20;
        this.arrayColor.push({
          full: false,
          color: this.pinColor,
          width: newWidth + 'px'
        });
        for (let j = i + 1; j < this.totalPin; j++) {
          this.arrayColor.push({
            full: true,
            color: this.pinColor,
            width: '70px'
          });
        }
        break;
      }
    }
    console.log(this.arrayColor);
  }

}
