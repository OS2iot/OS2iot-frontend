import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { isValidRssiInfo, RxInfo } from '@shared/helpers/rx-info.helper';
import { keyofNumber } from '@shared/helpers/type.helper';

@Component({
  selector: 'app-lorawan-field',
  templateUrl: './lorawan-field.component.html',
  styleUrls: ['./lorawan-field.component.scss'],
})
export class LorawanFieldComponent implements OnInit {
  @Input() device: IotDevice;
  isValidRssiInfo = isValidRssiInfo;
  noValueText: string;
  toText: string;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.translate
      .get(['IOTDEVICE-TABLE-ROW.NOT-AVAILABLE', 'GEN.to'])
      .subscribe((translations) => {
        this.noValueText = translations['IOTDEVICE-TABLE-ROW.NOT-AVAILABLE'];
        this.toText = translations['GEN.to'];
      });
  }

  buildRangeFromLoRaRxInfo(
    rxInfo: RxInfo[],
    prop: keyofNumber<RxInfo>
  ): string | number {
    const values = rxInfo.map((x) => x[prop]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min && max
      ? min !== max
        ? `${min} ${this.toText} ${max}`
        : max
      : this.noValueText;
  }

  /**
   * TS cannot narrow the type after passing a type guard
   */
  asRxInfo(rxInfo: unknown): RxInfo[] {
    return rxInfo as RxInfo[];
  }
}
