import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { DownlinkComponent } from './iot-device-detail/downlink/downlink.component';
import { IotDeviceDetailGenericComponent } from './iot-device-detail/iot-device-detail-generic/iot-device-detail-generic.component';
import { IotDeviceDetailLorawanComponent } from './iot-device-detail/iot-device-detail-lorawan/iot-device-detail-lorawan.component';
import { IotDeviceDetailSigfoxComponent } from './iot-device-detail/iot-device-detail-sigfox/iot-device-detail-sigfox.component';
import { IoTDeviceDetailComponent } from './iot-device-detail/iot-device-detail.component';
import { IotDeviceEditComponent } from './iot-device-edit/iot-device-edit.component';
import { SigfoxDeviceEditComponent } from './iot-device-edit/sigfox-device-edit/sigfox-device-edit.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';
import { DownlinkDialogComponent } from './iot-device-detail/downlink/downlink-dialog/downlink-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DeviceModelComponent } from './iot-device-detail/device-model/device-model.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataPackageComponent } from './iot-device-detail/data-package/data-package.component';
import { DataPackagesTimestampComponent } from './iot-device-detail/data-packages-timestamp/data-packages-timestamp.component';
import { GraphModule } from '@app/graph/graph.module';
import { IotDevicesTabComponent } from './iot-devices-tab/iot-devices-tab.component';
import { IotDeviceHistoryTabComponent } from './iot-device-detail/iot-device-history-tab/iot-device-history-tab.component';
import { IotDeviceDetailsTabComponent } from './iot-device-detail/iot-device-details-tab/iot-device-details-tab.component';
import { IotDeviceDataPacketsTabComponent } from './iot-device-detail/iot-device-data-packets-tab/iot-device-data-packets-tab.component';
import { IotDeviceDownlinkTabComponent } from './iot-device-detail/iot-device-downlink-tab/iot-device-downlink-tab.component';
import { MqttDeviceEditComponent } from './iot-device-edit/mqtt-device-edit/mqtt-device-edit.component';
import { IotDeviceDetailsMqttBrokerComponent } from './iot-device-detail/iot-device-details-mqtt-broker/iot-device-details-mqtt-broker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    IotDevicesTableComponent,
    IoTDeviceDetailComponent,
    IotDeviceEditComponent,
    SigfoxDeviceEditComponent,
    IotDeviceDetailGenericComponent,
    IotDeviceDetailLorawanComponent,
    IotDeviceDetailSigfoxComponent,
    DownlinkComponent,
    DownlinkDialogComponent,
    DeviceModelComponent,
    DataPackageComponent,
    DataPackagesTimestampComponent,
    IotDevicesTabComponent,
    IotDeviceHistoryTabComponent,
    IotDeviceDetailsTabComponent,
    IotDeviceDataPacketsTabComponent,
    IotDeviceDownlinkTabComponent,
    MqttDeviceEditComponent,
    IotDeviceDetailsMqttBrokerComponent,
  ],
  exports: [IotDevicesTableComponent, IoTDeviceDetailComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    FormModule,
    NGMaterialModule,
    FormsModule,
    PipesModule,
    MonacoEditorModule,
    GraphModule,
    FontAwesomeModule,
  ],
})
export class IotDevicesModule {}
