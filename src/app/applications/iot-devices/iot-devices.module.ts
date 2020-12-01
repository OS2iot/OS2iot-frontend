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
        DataPackageComponent
    ],
    exports: [
        IotDevicesTableComponent,
        IoTDeviceDetailComponent
    ],
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
    ],
})
export class IotDevicesModule { }
