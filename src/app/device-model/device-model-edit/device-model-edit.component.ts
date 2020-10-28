import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { DeviceModel } from '../device.model';
import { ControlledPropperty } from '../Enums/controlled-propperty.enum';
import { DeviceCategory } from '../Enums/device-category.enum';
import { DeviceFunction } from '../Enums/device-function.enum';
import { EnergyLimitationClass } from '../Enums/energy-limitation-class.enum';
import { SupportedProtocol } from '../Enums/supported-protocol.enum';
import { SupportedUnit } from '../Enums/supported-unit.enum';

@Component({
  selector: 'app-device-model-edit',
  templateUrl: './device-model-edit.component.html',
  styleUrls: ['./device-model-edit.component.scss']
})
export class DeviceModelEditComponent implements OnInit {

  public errorMessages: any;
  public errorFields: string[];
  public deviceModel: DeviceModel = new DeviceModel();
  public backButton: BackButton = { label: '', routerLink: '/device-model' };
  public title = '';
  public formFailedSubmit = false;
  controlledPropperties = [];
  categories = [];
  supportedUnits = [];
  deviceFunctions = [];
  energyLimitationClass = [];
  supportedProtocol = [];

  constructor(
    private translate: TranslateService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.get(['NAV.DEVICE-MODEL'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.DEVICE-MODEL'];
                this.title = translations['NAV.DEVICE-MODEL'];
            });
    this.mapEnumsToArray();
  }

  mapEnumsToArray() {
    this.controlledPropperties = Object.values(ControlledPropperty);
    this.categories = Object.values(DeviceCategory);
    this.supportedUnits = Object.values(SupportedUnit);
    this.deviceFunctions = Object.values(DeviceFunction);
    this.energyLimitationClass = Object.values(EnergyLimitationClass);
    this.supportedProtocol = Object.values(SupportedProtocol);
  }

  onSubmit() {
    console.log(this.deviceModel);
  }

  routeBack(): void {
    this.location.back();
  }

}
