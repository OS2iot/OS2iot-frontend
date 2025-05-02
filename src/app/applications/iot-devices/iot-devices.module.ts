import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GraphModule } from "@app/graph/graph.module";
import { IotDeviceDetailsMqttExternalBrokerComponent } from "@applications/iot-devices/iot-device-detail/iot-device-details-mqtt-external-broker/iot-device-details-mqtt-external-broker.component";
import { IotDeviceDetailsMqttInternalBrokerComponent } from "@applications/iot-devices/iot-device-detail/iot-device-details-mqtt-internal-broker/iot-device-details-mqtt-internal-broker.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { FormModule } from "@shared/components/forms/form.module";
import { TableSortIconComponent } from "@shared/components/table-sort-icon/table-sort-icon.component";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { SharedModule } from "@shared/shared.module";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { IoTDeviceChangeApplicationDialogComponent } from "./iot-device-change-application-dialog/iot-device-change-application-dialog.component";
import { DataPackageComponent } from "./iot-device-detail/data-package/data-package.component";
import { DataPackagesTimestampComponent } from "./iot-device-detail/data-packages-timestamp/data-packages-timestamp.component";
import { DeviceModelComponent } from "./iot-device-detail/device-model/device-model.component";
import { DownlinkDialogComponent } from "./iot-device-detail/downlink/downlink-dialog/downlink-dialog.component";
import { DownlinkTablesComponent } from "./iot-device-detail/downlink/downlink-tables/downlink-tables.component";
import { DownlinkComponent } from "./iot-device-detail/downlink/downlinks/downlink.component";
import { IotDeviceDataPacketsTabComponent } from "./iot-device-detail/iot-device-data-packets-tab/iot-device-data-packets-tab.component";
import { IotDeviceDetailGenericComponent } from "./iot-device-detail/iot-device-detail-generic/iot-device-detail-generic.component";
import { IotDeviceDetailLorawanComponent } from "./iot-device-detail/iot-device-detail-lorawan/iot-device-detail-lorawan.component";
import { IotDeviceDetailSigfoxComponent } from "./iot-device-detail/iot-device-detail-sigfox/iot-device-detail-sigfox.component";
import { IoTDeviceDetailComponent } from "./iot-device-detail/iot-device-detail.component";
import { IotDeviceDetailsTabComponent } from "./iot-device-detail/iot-device-details-tab/iot-device-details-tab.component";
import { IotDeviceDownlinkTabComponent } from "./iot-device-detail/iot-device-downlink-tab/iot-device-downlink-tab.component";
import { IotDeviceHistoryTabComponent } from "./iot-device-detail/iot-device-history-tab/iot-device-history-tab.component";
import { IotDeviceEditComponent } from "./iot-device-edit/iot-device-edit.component";
import { MqttAuthenticationSelectComponent } from "./iot-device-edit/mqtt-device-edit/mqtt-authentication-select/mqtt-authentication-select.component";
import { MqttDeviceEditComponent } from "./iot-device-edit/mqtt-device-edit/mqtt-device-edit.component";
import { SigfoxDeviceEditComponent } from "./iot-device-edit/sigfox-device-edit/sigfox-device-edit.component";
import { ExportCsvDialogComponent } from "./iot-devices-tab/export-csv-dialog/export-csv-dialog.component";
import { IotDevicesTabComponent } from "./iot-devices-tab/iot-devices-tab.component";
import { IotDevicesTableComponent } from "./iot-devices-table/iot-devices-table.component";
import { IotDeviceCopyComponent } from "./iot-device-copy/iot-device-copy.component";

@NgModule({
  declarations: [
    IotDevicesTableComponent,
    IoTDeviceDetailComponent,
    IotDeviceEditComponent,
    IotDeviceCopyComponent,
    SigfoxDeviceEditComponent,
    IotDeviceDetailGenericComponent,
    IotDeviceDetailLorawanComponent,
    IotDeviceDetailSigfoxComponent,
    DownlinkComponent,
    DownlinkDialogComponent,
    DownlinkTablesComponent,
    DeviceModelComponent,
    DataPackageComponent,
    DataPackagesTimestampComponent,
    IotDevicesTabComponent,
    IotDeviceHistoryTabComponent,
    IotDeviceDetailsTabComponent,
    IotDeviceDataPacketsTabComponent,
    IotDeviceDownlinkTabComponent,
    MqttDeviceEditComponent,
    IotDeviceDetailsMqttInternalBrokerComponent,
    MqttAuthenticationSelectComponent,
    IotDeviceDetailsMqttExternalBrokerComponent,
    ExportCsvDialogComponent,
    IoTDeviceChangeApplicationDialogComponent,
  ],
  exports: [IotDevicesTableComponent, IoTDeviceDetailComponent, IotDeviceEditComponent],
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
    ClipboardModule,
    TableSortIconComponent,
  ],
})
export class IotDevicesModule {}
